import fs from 'node:fs';

const copy = async (readablePath, writablePath) => {
    const readableStream = fs.createReadStream(readablePath);
    const writableStream = fs.createWriteStream(writablePath);

    readableStream.pipe(writableStream);
};

export default copy;