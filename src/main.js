import { app, ipcMain, BrowserWindow, dialog } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';
import * as fs from 'fs';
import { machineIdSync } from 'node-machine-id';

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

ipcMain.handle('print-silent-landscape', async (event, htmlContent) => {
  const printWin = new BrowserWindow({ show: false });

  const fullHtml = `
<!DOCTYPE html>
<html dir="rtl">
<head>
  <meta charset="utf-8">
  <style>
    @page { size: A4 landscape; margin: 0; }
    html, body { margin: 0; padding: 0; width: 297mm; height: 210mm; overflow: hidden; }
  </style>
</head>
<body>
  ${htmlContent}
</body>
</html>
  `;

  printWin.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(fullHtml));

  printWin.webContents.on('did-finish-load', () => {
    printWin.webContents.print({
      silent: true,           // No dialog — prints directly to default printer
      printBackground: true,
      landscape: true,        // Forces landscape
      margins: { marginType: 'none' },
      pageSize: 'A4',
    }, () => {
      printWin.close();
    });
  });
});

ipcMain.handle('print-and-save-pdf', async (event, htmlContent) => {
  const printWin = new BrowserWindow({ show: false });

  const fullHtml = `
<!DOCTYPE html>
<html dir="rtl">
<head>
  <meta charset="utf-8">
  <style>
    @page { size: A4 landscape; margin: 0; }
    html, body { margin: 0; padding: 0; width: 297mm; height: 210mm; overflow: hidden; }
  </style>
</head>
<body>
  ${htmlContent}
</body>
</html>
  `;

  printWin.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(fullHtml));

  printWin.webContents.on('did-finish-load', async () => {
  // Add delay to ensure content is fully rendered
  setTimeout(async () => {
    try {
      // Generate PDF data
      const pdfData = await printWin.webContents.printToPDF({
        printBackground: true,
        landscape: true,
        pageSize: 'A4',
        marginsType: 0,
      });

      // Auto-save to Documents
      const now = new Date();
      const date = now.toISOString().slice(0, 10);
      const time = now.toTimeString().slice(0, 8).replace(/:/g, '-');

      const fileName = `محضر-استلام-${date}_${time}.pdf`;
      const savePath = path.join(app.getPath('documents'), fileName);

      fs.writeFileSync(savePath, pdfData);

      // Then print to printer
      printWin.webContents.print({
        silent: false,
        printBackground: true,
        landscape: true,
        margins: { marginType: 'none' },
        pageSize: 'A4',
      }, () => {
        printWin.close();
      });
    } catch (err) {
      console.error('PDF generation failed:', err);
      printWin.close();
    }
  }, 1000); // 1000ms = 1 second delay (adjust if needed: 500–2000)
});
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
