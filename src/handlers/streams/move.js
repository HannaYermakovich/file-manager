import fs from 'node:fs';

const move = async (readablePath, writablePath) => {
    const readableStream = fs.createReadStream(readablePath);
    const writableStream = fs.createWriteStream(writablePath);

    readableStream.pipe(writableStream);

    fs.rm(readablePath, (err) => {
        if (err) process.stdout.write(err.message);
    });
};

export default move;