const getArguments = () => {
    return process.argv.slice(2)[0]?.replace(/--username=/ig, '') || 'stranger';
};

export default getArguments;