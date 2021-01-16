import { runFromCli } from '~/library.mjs';

const solution = (lines) => {
    const n = Number(lines[0]);
    const limit = 1 << n;
    const output = [];
    for (let x = 0; x < limit; x += 1) {
        output.push((x ^ (x >> 1)).toString(2).padStart(n, '0'));
    }
    return output;
};
export default solution;

if (process.env.NODE_ENV !== 'test') {
    runFromCli(solution);
}
