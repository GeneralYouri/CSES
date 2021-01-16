import { runFromCli } from '~/library.mjs';
import { subsetSums } from '~/src/library.mjs';

const solution = (lines) => {
    const _n = Number(lines[0]);
    const P = lines[1].split(' ').map(Number);
    const total = P.reduce((sum, p) => sum + p, 0);
    const differences = subsetSums(P).slice(1).map(sum => Math.abs(total - sum - sum));
    let best = Number.POSITIVE_INFINITY;
    for (let i = 0; i < differences.length; i += 1) {
        if (differences[i] < best) {
            best = differences[i];
        }
    }
    return best;
};
export default solution;

if (process.env.NODE_ENV !== 'test') {
    runFromCli(solution);
}
