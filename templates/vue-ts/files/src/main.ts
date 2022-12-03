import path from "path";
import { BrowserWindow, app, ipcMain, shell } from "electron";

app.whenReady().then(() => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.resolve(__dirname, "preload.js"),
    },
  });

  ipcMain.handle("open-external", async (_e, arg) => {
    await shell.openExternal(arg);
  });

  mainWindow.loadFile("dist/index.html");
  // mainWindow.webContents.openDevTools({ mode: 'detach' });
});

app.once("window-all-closed", () => app.quit());
