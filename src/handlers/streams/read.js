import fs from 'node:fs';

const read = (filePath) => {
    const readStream = fs.createReadStream(filePath);

    readStream.pipe(process.stdout);
    readStream.on('end', () => {
        process.stdout.write('\n\n');
    })
};

export default read;
