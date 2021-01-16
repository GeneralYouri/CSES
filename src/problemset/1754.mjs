import { runFromCli } from '~/library.mjs';

const solution = (lines) => {
    const output = [];
    for (const line of lines.slice(1)) {
        const [a, b] = line.split(' ').map(Number);
        const valid = (a + b) % 3 === 0 && 2 * a >= b && a <= 2 * b;
        output.push(valid ? 'YES' : 'NO');
    }
    return output;
};
export default solution;

if (process.env.NODE_ENV !== 'test') {
    runFromCli(solution);
}
