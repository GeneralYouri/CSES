import { runFromCli } from '~/lib.mjs';

const solution = (lines) => {
    let n = Number(lines[0]);
    const output = [n];
    while (n !== 1) {
        if (n % 2 === 0) {
            n /= 2;
        } else {
            n = 3 * n + 1;
        }
        output.push(n);
    }
    return output;
};
export default solution;

if (process.env.NODE_ENV !== 'test') {
    runFromCli(solution);
}
