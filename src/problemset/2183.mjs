import { runFromCli } from '~/library.mjs';
import { QuickSort } from '~/src/library.mjs';

const solution = (lines) => {
    const _n = Number(lines[0]);
    const X = QuickSort(lines[1].split(' ').map(Number));
    let result = 1;
    for (const x of X) {
        if (x <= result) {
            result += x;
        } else {
            break;
        }
    }
    return result;
};
export default solution;

if (process.env.NODE_ENV !== 'test') {
    runFromCli(solution);
}
