const { app, BrowserWindow } = require('electron')
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const fs = require('fs');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600
    })

    win.loadFile('./src/index.html')
}

function ad() {
    const PROTO_PATH = __dirname + '/keeper.proto';

    const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });

    const exampleProto = grpc.loadPackageDefinition(packageDefinition).keeper;
    const client = new (exampleProto.FileService)('localhost:5000', grpc.credentials.createInsecure());

    const metadata = new grpc.Metadata();
    metadata.set("file_name", '223458.txt');
    metadata.set("location", '3');

    const fileStream = fs.createReadStream('./src/text.txt');

    const call = client.save(metadata, (err, response) => {
        if (err) {
            console.error(err);
        } else {
            console.log(response);
        }
    });

    fileStream.on('data', (chunk) => {
        console.log(chunk);
        call.write({ bytes: chunk }); // Отправляем чанк
    });

    fileStream.on('end', () => {
        call.end(); // Завершаем поток
    });

    fileStream.on('error', (err) => {
        console.error('Ошибка при чтении файла:', err);
    });
}

app.whenReady().then(() => {
    createWindow()
    ad()
})