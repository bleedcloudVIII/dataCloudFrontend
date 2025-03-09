const { app, BrowserWindow, ipcMain, dialog, ipcRenderer } = require('electron')
const protoLoader = require("@grpc/proto-loader");
const grpc = require("@grpc/grpc-js");
const fs = require("fs");
const FileService = require('./services/FileService')

const fileService = new FileService();

let mainWindow;
let modalWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 700,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webviewTag: true,
            enableRemoteModule: true,
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
            contextIsolation: false,
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

ipcMain.on('save-file', async (event, filePath) => {
    fileService.save(filePath);
});

// ipcMain.on('open-file-dialog-for-file', (event) => {
//     dialog.showOpenDialog({
//         properties: ['openFile', 'openDirectory']
//     }).then( result => {
//         if (!result.canceled && result.filePaths.length > 0) {
//             event.sender.send('save-file', result.filePaths[0]); // Отправляем первый выбранный путь
//         }
//     });
// });
