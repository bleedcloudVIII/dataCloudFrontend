const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const fs = require('fs');

class FileService {
    download(dirPath, fileName) {
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

        if (!fileName) return "Net fileName"

        const call = client.download({location: '6', file_name: fileName});

        const write_stream = fs.createWriteStream(dirPath + '\\' + fileName);

        call.on('data', (data) => {
            write_stream.write(data.bytes);
        });

        call.on('end', () => {
            write_stream.end();
        });

        call.on('err', (err) => {
            return err;
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
