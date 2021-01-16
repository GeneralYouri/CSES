import { runFromCli } from '~/library.mjs';
import { QuickSort } from '~/src/library.mjs';

const solution = (lines) => {
    const n = Number(lines[0]);
    const startTimes = {};
    const endTimes = new Set();
    for (let i = 1; i <= n; i += 1) {
        const [start, end] = lines[i].split(' ').map(Number);
        if (!(end in startTimes) || start > startTimes[end]) {
            endTimes.add(end);
            startTimes[end] = start;
        }
    }
    const endTimesSorted = QuickSort(Array.from(endTimes));

    let count = 0;
    let time = 0;
    let i = 0;
    while (i < endTimesSorted.length) {
        time = endTimesSorted[i];
        count += 1;
        do {
            i += 1;
        } while (i < endTimesSorted.length && time > startTimes[endTimesSorted[i]]);
    }
    return count;
};
export default solution;

if (process.env.NODE_ENV !== 'test') {
    runFromCli(solution);
}
