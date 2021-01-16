import { runFromCli } from '~/library.mjs';

const solution = (lines) => {
    const n = Number(lines[0]);
    if (n % 4 === 1 || n % 4 === 2) {
        return 'NO';
    }

    const set1 = [n];
    const set2 = [];
    let remainder = (n + 1) * (n / 2) / 2 - n;
    for (let k = n - 1; k > 1; k -= 1) {
        if (k <= remainder && k % 2 === 0) {
            set1.push(k);
            remainder -= k;
        } else {
            set2.push(k);
        }
    }
    (remainder === 1 ? set1 : set2).push(1);

    return ['YES',
        set1.length, set1,
        set2.length, set2,
    ];
};
export default solution;

if (process.env.NODE_ENV !== 'test') {
    runFromCli(solution);
}
