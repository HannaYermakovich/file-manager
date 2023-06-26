import readline from 'readline';
import { stdin as input, stdout as output } from 'process';

import handleCommand from './utils.js';
import { USERNAME } from './const/const.js';
import getArguments from './helpers/getArguments.js';

const userName = getArguments(USERNAME) || 'new person';
const rl = readline.createInterface({ input, output });

process.stdout.write(`Welcome to the File Manager, ${userName}!\n`);

process.stdout.write(`\nYou are currently in \x1b[33m${process.cwd()}\x1b[0m\n\n`);

process.on('uncaughtException', (err) => {
    process.stdout.write(err.message);
    console.log('\n');
});

rl
    .on('line', async input => {
        const [command, value1, value2] = input.toString().trim().split(' ');

        if (command === '.exit') rl.close();

        if (command) await handleCommand(command, value1, value2);
        process.stdout.write(`\nYou are currently in \x1b[33m${process.cwd()}\x1b[0m\n\n`);
    })
    .on('SIGINT', () => rl.close())
    .on('close', () => {
        process.stdout.write(`Thank you for using File Manager, ${userName}, goodbye!\n`)
        process.exit();
    })
