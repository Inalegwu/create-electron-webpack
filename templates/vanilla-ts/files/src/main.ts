import path from 'path';
import { app, BrowserWindow } from 'electron';

import { reloader } from './reloader';

if (process.env.NODE_ENV === 'development') {
  reloader({
    mainPaths: ['dist/main.js', 'dist/preload.js'],
    rendererPaths: ['dist/index.html', 'dist/app.js'],
  });
}

app.whenReady().then(() => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadFile('dist/index.html');
  mainWindow.webContents.openDevTools({ mode: 'detach' });
});

app.on('window-all-closed', () => app.quit());
