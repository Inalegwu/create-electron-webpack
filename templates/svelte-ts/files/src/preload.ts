import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("myAPI", {
  openExternal: (arg: string): Promise<void> =>
    ipcRenderer.invoke("open-external", arg),
});
