import path from 'path';
import { BrowserWindow, app } from 'electron';

import { reloader } from './reloader';

if (process.env.NODE_ENV === 'development') {
  reloader({
    mainPaths: ['dist/main.js', 'dist/preload.js'],
    rendererPaths: ['dist/index.html', 'dist/app.js', 'dist/app.css'],
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
