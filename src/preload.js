import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
    getTemplatePath: () => ipcRenderer.invoke('get-template-path'),
    printPortrait: (html) => ipcRenderer.invoke('print-portrait', html),
    //saveAsPDF: (html) => ipcRenderer.invoke('save-as-pdf', html), // New
    // for license
    getMachineId: () => ipcRenderer.invoke('get-machine-id'),
    saveLicense: (key) => ipcRenderer.invoke('save-license', key),
    getLicense: () => ipcRenderer.invoke('get-license'),
      readJson: (fileName) => ipcRenderer.invoke("read-json", fileName),
  getAssetPath: (fileName) => ipcRenderer.invoke("get-asset-path", fileName),

});