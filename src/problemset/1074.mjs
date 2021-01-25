import { runFromCli } from '~/library.mjs';
import { QuickSort } from '~/src/library.mjs';

const solution = (lines) => {
    const _n = Number(lines[0]);
    const P = QuickSort(lines[1].split(' ').map(Number));
    const median = P[Math.floor(P.length / 2)];
    let sum = 0;
    for (const p of P) {
        sum += Math.abs(p - median);
    }
    return sum;
};
export default solution;

if (process.env.NODE_ENV !== 'test') {
    runFromCli(solution);
}
