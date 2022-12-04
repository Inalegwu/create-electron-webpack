import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("myAPI", {
  openExternal: (arg) => ipcRenderer.invoke("open-external", arg),
});
