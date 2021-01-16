import { runFromCli } from '~/library.mjs';
import { QuickSort } from '~/src/library.mjs';

const solution = (lines) => {
    const n = Number(lines[0]);
    lines.push(Number.POSITIVE_INFINITY + ' ' + Number.POSITIVE_INFINITY);
    let arrivals = [];
    let departures = [];
    for (let i = 1; i <= n + 1; i += 1) {
        const [arrival, departure] = lines[i].split(' ').map(Number);
        arrivals.push(arrival);
        departures.push(departure);
    }
    arrivals = QuickSort(arrivals);
    departures = QuickSort(departures);

    let count = 0;
    let best = 0;
    let i = 0;
    let j = 0;
    while (i < n || j < n) {
        if (arrivals[i] < departures[j]) {
            count += 1;
            i += 1;
        } else {
            count -= 1;
            j += 1;
        }
        if (count > best) {
            best = count;
        }
    }
    return best;
};
export default solution;

if (process.env.NODE_ENV !== 'test') {
    runFromCli(solution);
}
