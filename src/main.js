const { app, BrowserWindow } = require('electron')
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const fs = require('fs');
const electron = require('electron')

// const { app, BrowserWindow } = require('electron');

function createWindow() {
    const win = new BrowserWindow({
        width: 900,
        height: 700,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webviewTag: true,
        }
    });

    win.loadFile('src/index.html');
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

// function ad() {
//     const PROTO_PATH = __dirname + '/keeper.proto';
//
//     const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
//         keepCase: true,
//         longs: String,
//         enums: String,
//         defaults: true,
//         oneofs: true
//     });
//
//     const exampleProto = grpc.loadPackageDefinition(packageDefinition).keeper;
//     const client = new (exampleProto.FileService)('localhost:5000', grpc.credentials.createInsecure());
//
//     const metadata = new grpc.Metadata();
//     metadata.set("file_name", '223458.txt');
//     metadata.set("location", '3');
//
//     const fileStream = fs.createReadStream('./src/text.txt');
//
//     const call = client.save(metadata, (err, response) => {
//         if (err) {
//             console.error(err);
//         } else {
//             console.log(response);
//         }
//     });
//
//     fileStream.on('data', (chunk) => {
//         console.log(chunk);
//         call.write({ bytes: chunk }); // Отправляем чанк
//     });
//
//     fileStream.on('end', () => {
//         call.end(); // Завершаем поток
//     });
//
//     fileStream.on('error', (err) => {
//         console.error('Ошибка при чтении файла:', err);
//     });
// }
//
