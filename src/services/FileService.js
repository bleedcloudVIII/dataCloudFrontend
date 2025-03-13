const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const fs = require('fs');

class FileService {
    download(dirPath) {
        const PROTO_PATH = './src/services/keeper.proto';

        const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true,
        });

        const exampleProto = grpc.loadPackageDefinition(packageDefinition).keeper;
        const client = new (exampleProto.FileService)('localhost:5000', grpc.credentials.createInsecure());

        const call = client.download({location: '1', file_name: 'example223.txt'});
        const writer = Bun.file('./example1.txt');

        call.on('data', (chunk) => {
            console.log(chunk.bytes);
            writer.write(chunk.bytes);
        });

        call.on('end', () => {
            console.log('end')
        });

        call.on('error', (err) => {

        });
    }

    getFileName(filePath) {
        const arr = filePath.split('\\');
        return arr[arr.length - 1];
    }

    save(filePath) {
        const PROTO_PATH = './src/services/keeper.proto';

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

        const fileName = this.getFileName(filePath);

        if (fileName) metadata.set("file_name", fileName);
        else return "Error with file name";

        metadata.set("location", '5');

        const fileStream = fs.createReadStream(filePath);

        const call = client.save(metadata, (err, response) => {
            if (err) {
                return err;
            } else {
                return response;
            }
        });

        fileStream.on('data', (chunk) => {
            call.write({ bytes: chunk });
        });

        fileStream.on('end', () => {
            call.end();
        });

        fileStream.on('error', (err) => {
            return err;
        });
    }
}

module.exports = FileService;
