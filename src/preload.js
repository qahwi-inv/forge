import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
    getTemplatePath: () => ipcRenderer.invoke('get-template-path'),
    //printSilentLandscape: (html) => ipcRenderer.invoke('print-silent-landscape', html),
    //saveAsPDF: (html) => ipcRenderer.invoke('save-as-pdf', html), // New
    printAndSavePDF: (html) => ipcRenderer.invoke('print-and-save-pdf', html),
    // for license
    getMachineId: () => ipcRenderer.invoke('get-machine-id'),
    saveLicense: (key) => ipcRenderer.invoke('save-license', key),
    getLicense: () => ipcRenderer.invoke('get-license'),
});