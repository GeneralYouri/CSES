import readline from 'readline';

const solve = (line1) => {
    const [a, b] = line1.split(' ').map(Number);
    return a + b;
};

const printAnswer = (answer) => {
    let output = answer;
    if (Array.isArray(answer)) {
        if (Array.isArray(answer[0])) {
            output = output.map(o => o.join(' '));
        }
        output = output.join('\n');
    }
    console.log(output);
};

(() => {
    const r = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });
    let lines = [];
    r.on('line', async (line) => {
        lines.push(line);
        if (lines.length === solve.length) {
            const answer = await solve.call(null, ...lines);
            printAnswer(answer);
            lines = [];
        }
    });
})();
