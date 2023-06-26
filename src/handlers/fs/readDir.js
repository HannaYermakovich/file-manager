import fs from 'node:fs';
import path from 'node:path';

const readPath = async (filePath, ls) => {
    try {
        const stat = fs.statSync(filePath);
        const isFile = stat.isFile();

        if (isFile) {
            const readStream = fs.createReadStream(filePath);
            const { dir } = path.parse(filePath);
            process.chdir(dir);

            readStream.pipe(process.stdout);
            readStream.on('end', () => {
                process.stdout.write('\n\n');
            });
        } else {
            const files = fs.readdirSync(filePath);
            process.chdir(filePath);

            const sortedFiles = files.map((file) => {
                const currentFilePath = path.join(filePath, file);
                const isFile = fs.lstatSync(currentFilePath).isFile();

                return ({
                    name: file,
                    type: isFile ? 'file' : 'directory'
                })
            })
                .sort((file1, file2) => {
                    const currentFilePath1 = path.join(filePath, file1.name);
                    const currentFilePath2 = path.join(filePath, file2.name);

                    if (fs.lstatSync(currentFilePath1).isDirectory() && fs.lstatSync(currentFilePath2).isDirectory()) {
                        return file1.name < file2.name ? -1 : 1;
                    } else if (fs.lstatSync(currentFilePath1).isFile() && fs.lstatSync(currentFilePath2).isFile()) {
                        return file1.name < file2.name ? -1 : 1;
                    }
                    if (fs.lstatSync(currentFilePath1).isDirectory() && fs.lstatSync(currentFilePath2).isFile()) {
                        return -1;
                    } else if (fs.lstatSync(currentFilePath1).isFile() && fs.lstatSync(currentFilePath2).isDirectory()) {
                        return 1;
                    };
                });

            if (ls) {
                console.table(sortedFiles);
            } else {
                for (const file of sortedFiles)
                    process.stdout.write(file.name + '\n');
            }
        }
    } catch (err) {
        throw Error(err + '\n');
    }
};

export default readPath;