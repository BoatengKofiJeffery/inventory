/**
 * Kunupa Natural Mineral Water - Electron Main Process Entry
 */

const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const fs = require('fs');
const { initDatabase, saveToDisk } = require('./src/main/database/db');
const { registerIpcHandlers } = require('./src/main/ipc/ipcHandlers');

let mainWindow = null;

async function createWindow() {
  const iconPath = path.join(__dirname, 'assets', 'kunupa-logo.ico');

  mainWindow = new BrowserWindow({
    width: 1360,
    height: 860,
    minWidth: 1080,
    minHeight: 700,
    title: 'KUNUPA NATURAL MINERAL WATER - Inventory Management System',
    icon: fs.existsSync(iconPath) ? iconPath : undefined,
    backgroundColor: '#0a192f',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    },
    show: false
  });

  // Remove default standard Electron menu bar for modern native desktop appearance
  Menu.setApplicationMenu(null);

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  mainWindow.once('ready-to-show', () => {
    mainWindow.maximize();
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Register all IPC handlers
  registerIpcHandlers(mainWindow);
}

app.whenReady().then(async () => {
  try {
    console.log('[App] Initializing Kunupa SQLite Database...');
    await initDatabase();
    console.log('[App] Database ready. Spawning MainWindow...');
    await createWindow();
  } catch (err) {
    console.error('[App] Failed to start application:', err);
  }

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('before-quit', () => {
  console.log('[App] Persisting SQLite DB to disk before exit...');
  saveToDisk();
});

app.on('window-all-closed', () => {
  saveToDisk();
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
