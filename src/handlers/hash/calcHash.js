import crypto from 'node:crypto';
import fs from 'node:fs';

const calculateHash = async (filePath) => {
    await fs.readFile(filePath, (err, data) => {
        if (err) {
            throw err;
        } else { 
            const hash = crypto.createHash('sha256').update(data).digest('hex');
            console.log(hash);
        }
    });
};

export default calculateHash;