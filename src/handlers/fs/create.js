import fs from 'node:fs';

const create = async (newFileName) => {
    fs.writeFile(newFileName, '', { flag: 'wx' }, (err) => {
        if (err) {
            throw new Error(err.message)
        }
    })
};

export default create;