import zlib from 'node:zlib';
import fs from 'node:fs';
import stream from 'node:stream';
import path from 'node:path';

const compress = async (filePath, destination) => {
    let destinationPath = destination;
    const isDirectory = fs.statSync(destinationPath).isDirectory();
    const isFile = fs.statSync(filePath).isFile();

    if (!isFile) {
        throw new Error('First argument is not a file');
    }

    if (isDirectory) {
        const { base } = path.parse(filePath);
        destinationPath = path.join(destinationPath, base);
    }

    const gz = zlib.createGzip();
    const rs = fs.createReadStream(filePath);
    const ws = fs.createWriteStream(destinationPath);

    stream.pipeline(rs, gz, ws, (err) => {
        if (err) {
            throw Error(err.message);
        }
    })
};

export default compress;