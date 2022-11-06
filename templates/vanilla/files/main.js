const { app, BrowserWindow } = require('electron');
const path = require('path');

const { reloader } = require('./reloader');

if (process.env.NODE_ENV === 'development') {
  reloader({
    mainPaths: ['main.js', 'preload.js'],
    rendererPaths: ['index.html', 'renderer.js'],
  });
}

app.whenReady().then(() => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadFile('index.html');
  // mainWindow.webContents.openDevTools({ mode: 'detach' });
});

app.on('window-all-closed', () => app.quit());
