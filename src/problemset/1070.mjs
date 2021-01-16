import { runFromCli } from '~/library.mjs';

const solution = (lines) => {
    const n = Number(lines[0]);
    if (n === 1) {
        return 1;
    } else if (n < 4) {
        return 'NO SOLUTION';
    }

    let output = '';
    let a = 2;
    while (a <= n) {
        output += ' ' + a;
        a += 2;
    }
    a = 1;
    while (a <= n) {
        output += ' ' + a;
        a += 2;
    }
    return output;
};
export default solution;

if (process.env.NODE_ENV !== 'test') {
    runFromCli(solution);
}
