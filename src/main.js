const { app, BrowserWindow, ipcMain } = require('electron')
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const fs = require('fs');
const electron = require('electron')

// const { app, BrowserWindow } = require('electron');

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
        }
    });

    mainWindow.loadFile('src/index.html');
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

    modalWindow.loadFile('./src/auth/auth.html');

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