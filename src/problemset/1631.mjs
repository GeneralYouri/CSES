import { runFromCli } from '~/library.mjs';

const solution = (lines) => {
    const _n = lines[0].split(' ').map(Number);
    const T = lines[1].split(' ').map(Number);
    let sum = 0;
    let max = 0;
    for (const t of T) {
        sum += t;
        if (t > max) {
            max = t;
        }
    }
    return Math.max(sum, 2 * max);
};
export default solution;

if (process.env.NODE_ENV !== 'test') {
    runFromCli(solution);
}
