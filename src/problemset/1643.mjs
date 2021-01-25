import { runFromCli } from '~/library.mjs';

const solution = (lines) => {
    const _n = Number(lines[0]);
    const values = lines[1].split(' ').map(Number);

    let best = Number.NEGATIVE_INFINITY;
    let sum = 0;
    let i = 0;
    for (; i < values.length; i += 1) {
        const x = values[i];
        sum += x;
        if (sum < 0) {
            sum = 0;
            if (values[i] > best) {
                best = values[i];
            }
        } else if (sum > best) {
            best = sum;
        }
    }

    return best;
};
export default solution;

if (process.env.NODE_ENV !== 'test') {
    runFromCli(solution);
}
