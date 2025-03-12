const { app, BrowserWindow, ipcMain, dialog, ipcRenderer } = require('electron')
const FileService = require('./services/FileService')
const path = require("path");

const fileService = new FileService();

let mainWindow;
let modalWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 700,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: true,
            webviewTag: true,
        }
    });

    mainWindow.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

function createModal() {
    modalWindow = new BrowserWindow({
        width: 450,
        height: 350,
        parent: mainWindow,
        modal: true,
        show: false,
        // frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            webviewTag: true,

        }
    });

    modalWindow.loadFile('./auth/auth.html');

    modalWindow.once('ready-to-show', () => {
        modalWindow.show();
    });

    modalWindow.on('closed', () => {
        modalWindow = null;
    });
}

ipcMain.on('open-modal', () => {
    createModal();
    if (mainWindow) {
        mainWindow.webContents.send('modal-opened');
    }
});

ipcMain.on('save-file', (event, filePath) => {
    console.log(filePath);
    fileService.save(filePath);
});
