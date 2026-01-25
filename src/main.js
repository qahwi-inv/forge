import { app, ipcMain, BrowserWindow, dialog } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';
import * as fs from 'fs';
import { machineIdSync } from 'node-machine-id';
import { protocol } from 'electron';

const isDev = process.env.NODE_ENV === "development";

app.whenReady().then(() => {
  protocol.registerFileProtocol('asset', (request, callback) => {
    const url = request.url.replace('asset://', '');
    const filePath = path.join(getAssetsPath(), url);

    callback({ path: filePath });
  });
});

ipcMain.handle('get-machine-id', () => {
  return machineIdSync(); // Unique hardware hash
});

ipcMain.handle('save-license', (event, key) => {
  const userDataPath = app.getPath('userData');
  const licensePath = path.join(userDataPath, 'license.txt');
  fs.writeFileSync(licensePath, key);
  return true;
});

ipcMain.handle('get-license', () => {
  const userDataPath = app.getPath('userData');
  const licensePath = path.join(userDataPath, 'license.txt');
  if (fs.existsSync(licensePath)) {
    return fs.readFileSync(licensePath, 'utf-8');
  }
  return null;
});

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1300,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();
};

function getAppRoot() {
  return app.isPackaged
    ? path.dirname(app.getPath('exe'))
    : process.cwd();
}

function ensureTemplateExists() {
  const appRoot = getAppRoot();
  const targetPath = path.join(appRoot, 'template.json');
  const bundledPath = path.join(process.resourcesPath, 'template.json');

  try {
    if (!fs.existsSync(targetPath)) {
      if (!fs.existsSync(bundledPath)) {
        throw new Error(`Bundled template not found at ${bundledPath}`);
      }
      fs.copyFileSync(bundledPath, targetPath);
    }
  } catch (err) {
    console.error('Failed to ensure template.json:', err);
  }

  return targetPath;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {

   const templatePath = ensureTemplateExists();

  ipcMain.handle('get-template-path', () => {
    return templatePath;
  });

  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

const getAssetsPath = () => {
  return app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(app.getAppPath(), 'public', 'assets');
};

ipcMain.handle("read-json", (event, fileName) => {
  const fullPath = isDev
    ? path.join(app.getAppPath(), "public", fileName)
    : path.join(process.resourcesPath, "assets", fileName);

  const data = fs.readFileSync(fullPath, "utf8");
  return JSON.parse(data);
});

ipcMain.handle('print-portrait', async (event, { content, url }) => {
  const printWin = new BrowserWindow({
    show: true, // 👈 IMPORTANT for macOS
    webPreferences: {
      webSecurity: false, // 👈 needed for file:// images
    },
  });

  const assetsPath = getAssetsPath();

  // remove leading slash
  const imagePath = path.join(assetsPath, url.replace(/^\/+/, ''));
  const imageSrc = `file://${imagePath.replace(/\\/g, '/')}`;

  const fullHtml = `
<!DOCTYPE html>
<html dir="rtl">
<head>
  <meta charset="utf-8">
  <style>
    @page { size: A4 portrait; margin: 0; }
    html, body {
      margin: 0;
      padding: 0;
      width: 210mm;
      height: 297mm;
    }
    .print-area {
      width: 210mm;
      height: 297mm;
      position: relative;
    }
    .bg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: contain;
      z-index: 0;
    }
    .content {
      position: relative;
      z-index: 1;
    }
  </style>
</head>
<body>
  <div class="print-area">
    <img id="bg" class="bg" src="${imageSrc}" />
    <div class="content">
      ${content}
    </div>
  </div>

  <script>
    window.imageReady = false;
    const img = document.getElementById('bg');
    img.onload = () => {
      window.imageReady = true;
    };
    img.onerror = () => {
      console.error('Image failed to load');
      window.imageReady = true;
    };
  </script>
</body>
</html>
`;

  await printWin.loadURL(
    'data:text/html;charset=utf-8,' + encodeURIComponent(fullHtml)
  );

  // 🔥 WAIT FOR IMAGE TO LOAD (THIS IS THE KEY)
  await printWin.webContents.executeJavaScript(`
    new Promise(resolve => {
      if (window.imageReady) resolve();
      else {
        const img = document.getElementById('bg');
        img.onload = resolve;
        img.onerror = resolve;
      }
    });
  `);

  // Small extra safety delay for macOS rendering
  await new Promise(r => setTimeout(r, 100));

  printWin.webContents.print(
    {
      silent: false,           // set false if you want dialog
      printBackground: true,
      margins: { marginType: 'none' },
      pageSize: 'A4',
    },
    () => {
      printWin.close();
    }
  );
});