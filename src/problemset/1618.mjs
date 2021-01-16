import { runFromCli } from '~/library.mjs';

const solution = (lines) => {
    const n = Number(lines[0]);
    let count = 0;
    for (let k = 5; k <= n; k *= 5) {
        count += Math.trunc(n / k);
    }
    return count;
};
export default solution;

if (process.env.NODE_ENV !== 'test') {
    runFromCli(solution);
}
