import { runFromCli } from '~/library.mjs';

const solution = (lines) => {
    const _n = Number(lines[0]);
    const N = lines[1].split(' ').map(Number);
    let count = 0;
    let current = 0;
    for (const a of N) {
        if (a > current) {
            current = a;
        } else {
            count += current - a;
        }
    }
    return count;
};
export default solution;

if (process.env.NODE_ENV !== 'test') {
    runFromCli(solution);
}
