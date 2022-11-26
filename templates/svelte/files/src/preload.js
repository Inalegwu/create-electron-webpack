import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('myAPI', {
  updateTitle: (arg) => ipcRenderer.invoke('update-title', arg),
});
