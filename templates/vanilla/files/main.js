const path = require('path');
const { app, BrowserWindow } = require('electron');

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
