import os from 'node:os';

const operatingSystem = (value) => {

    if (!value) {
        throw Error('Please, add flag from following: --EOL, --cpus, --homedir, --username, --architecture');
    };

    const OS_COMMAND = {
        '--EOL': () => console.log('End-Of-Line: ', JSON.stringify(os.EOL)),
        '--cpus': () => console.log(os.cpus()),
        '--homedir': () => console.log(os.homedir()),
        '--username': () => console.log(os.userInfo().username),
        '--architecture': () => console.log(os.arch())
    };

    if(OS_COMMAND[value]) {
        OS_COMMAND[value]();
    } else {
        console.log('Invalid flag. Please, try another');
    }
};

export default operatingSystem;