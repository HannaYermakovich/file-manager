import fs from 'node:fs';

const rename = async (oldPath, newPath) => {
    fs.rename(oldPath, newPath, err => {
        if (err) throw Error(err.message);
    });
};

export default rename;