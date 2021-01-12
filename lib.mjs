import readline from 'readline';

export const formatAnswer = (answer) => {
    let output = answer;
    if (Array.isArray(answer)) {
        output = output.map(o => (Array.isArray(o) ? o.join(' ') : o.toString()));
        output = output.join('\n');
    }
    return output.toString().trim();
};

export const runFromCli = (fn) => {
    const handle = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });
    let lines = [];
    handle.on('line', (line) => {
        // Custom indication of input end to also allow manual input and multi inputs, mostly for development testing
        if (line === ' ') {
            const answer = fn.call(null, lines);
            console.log(formatAnswer(answer));
            lines = [];
        } else {
            lines.push(line);
        }
    });
    handle.on('close', () => {
        const answer = fn.call(null, lines);
        console.log(formatAnswer(answer));
    });
};
