import path from 'path';
import { BrowserWindow, app } from 'electron';

if (process.env.NODE_ENV === 'development') {
  require('electron-nice-auto-reload')({
    rootPath: path.join(process.cwd(), 'dist'),
    rules: [{ action: 'app.relaunch' }],
  });
}

app.whenReady().then(() => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.resolve(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadFile('dist/index.html');
  // mainWindow.webContents.openDevTools({ mode: 'detach' });
});

app.once('window-all-closed', () => app.quit());
