const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const fs = require('fs');

class FileService {
    download() {

    }

    save(filePath) {
        const PROTO_PATH = './keeper.proto';

        const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true,
        });

        const exampleProto = grpc.loadPackageDefinition(packageDefinition).keeper;
        const client = new (exampleProto.FileService)('localhost:5000', grpc.credentials.createInsecure());

        const metadata = new grpc.Metadata();
        metadata.set("file_name", '223458.txt');
        metadata.set("location", '4');

        const fileStream = fs.createReadStream(filePath);

        const call = client.save(metadata, (err, response) => {
            if (err) {
                console.error(err);
            } else {
                console.log(response);
            }
        });

        fileStream.on('data', (chunk) => {
            console.log(chunk);
            call.write({ bytes: chunk });
        });

        fileStream.on('end', () => {
            call.end(); // Завершаем поток
        });

        fileStream.on('error', (err) => {
            console.error('Ошибка при чтении файла:', err);
        });
    }
}

module.exports = FileService;
