import fs from 'node:fs';

const remove = async (filePath) => {
    fs.rm(filePath, err => {
        if (err) throw Error(err.message);
    });
};

export default remove;