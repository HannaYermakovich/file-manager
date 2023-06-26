import path from 'node:path';

import read from './handlers/streams/read.js';
import copy from './handlers/streams/copy.js';
import move from './handlers/streams/move.js';
import create from './handlers/fs/create.js';
import rename from './handlers/fs/rename.js';
import remove from './handlers/fs/remove.js';
import readPath from './handlers/fs/readDir.js';
import operatingSystem from './handlers/os/os.js';
import calculateHash from './handlers/hash/calcHash.js';
import compress from './handlers/zip/compress.js';
import decompress from './handlers/zip/decompress.js';

const handleCommand = async (command, value1, value2) => {
    const dirname = process.cwd();

    const COMMAND = {
        add: async () => {
            const filePath = path.join(dirname, value1);

            await create(filePath);
        },
        cat: async () => {
            const filePath = path.join(dirname, value1);

            await read(filePath);
        },
        rn: async () => {
            const oldPath = path.join(dirname, value1);
            const newPath = path.join(dirname, value2);

            await rename(oldPath, newPath);
        },
        cp: async () => {
            console.log(dirname, value1, value2)
            const readablePath = path.join(dirname, value1);
            const { base: baseName } = path.parse(readablePath);
            const writablePath = path.normalize(dirname, value2, baseName);
            console.log(readablePath, writablePath)

            await copy(readablePath, writablePath);
        },
        mv: async () => {
            const readablePath = path.join(dirname, value1);
            const { base: baseName } = path.parse(readablePath);
            const writablePath = path.join(dirname, value2, baseName);

            await move(readablePath, writablePath);
        },
        rm: async () => {
            const filePath = path.join(dirname, value1);

            await remove(filePath);
        },
        up: () => {
            process.chdir('..');
        },
        cd: async () => {
            const filePath = path.normalize(path.join(dirname, value1));

            await readPath(filePath);
        },
        ls: async () => {
            await readPath(dirname, 'ls');
        },
        os: () => {
            operatingSystem(value1);
        },
        hash: async () => {
            const filePath = path.join(dirname, value1);

            await calculateHash(filePath);
        },
        compress: async () => {
            const filePath = path.join(dirname, value1);
            const destination = path.join(dirname, value2);

            await compress(filePath, destination);
        },
        decompress: async () => {
            const filePath = path.join(dirname, value1);
            const destination = path.join(dirname, value2);

            await decompress(filePath, destination);
        },
    }

    if (!COMMAND[command]) {
        process.stdout.write('Invalid command. Please, try another one\n\n')
    } else {
        await COMMAND[command]();
    }
}

export default handleCommand;