import { runFromCli } from '~/lib.mjs';

const solution = (lines) => {
    const [_n, x] = lines[0].split(' ').map(Number);
    const A = lines[1].split(' ').map(Number);
    const uniques = new Set(A);
    for (let i = 0; i < A.length - 1; i += 1) {
        const a = A[i];
        for (let j = i + 1; j < A.length; j += 1) {
            const b = A[j];
            const c = x - a - b;
            if (uniques.has(c)) {
                const k = A.indexOf(c, j + 1);
                if (k !== -1) {
                    return [i + 1, j + 1, k + 1];
                }
            }
        }
    }
    return 'IMPOSSIBLE';
};
export default solution;

if (process.env.NODE_ENV !== 'test') {
    runFromCli(solution);
}
