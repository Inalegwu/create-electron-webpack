import path from 'path';
import { app, BrowserWindow } from 'electron';

app.whenReady().then(() => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadFile('dist/index.html');
  // mainWindow.webContents.openDevTools({ mode: 'detach' });
});

app.on('window-all-closed', () => app.quit());
