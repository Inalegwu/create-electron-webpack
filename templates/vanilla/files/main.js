const { app, BrowserWindow } = require('electron');
const path = require('path');

if (process.env.NODE_ENV === 'development') {
  require('electron-nice-auto-reload')({
    rootPath: process.cwd(),
    rules: [{ action: 'app.relaunch' }],
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
