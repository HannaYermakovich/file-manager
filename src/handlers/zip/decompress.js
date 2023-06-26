import zlib from 'node:zlib';
import fs from 'node:fs';
import path from 'node:path';

const decompress = async (filePath, destination) => {
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

    const rs = fs.createReadStream(filePath);
    const ws = fs.createWriteStream(destinationPath);
    const unzip = zlib.createGunzip();

    rs.pipe(unzip).pipe(ws);
};

export default decompress;