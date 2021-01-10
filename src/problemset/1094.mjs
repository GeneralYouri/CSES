export const testcases = [
    {
        input: '5\n'
            + '3 2 5 1 7',
        output: '5',
    },
];

export const solution = (lines) => {
    const _n = Number(lines[0]);
    const N = lines[1].split(' ').map(Number);
    let count = 0;
    let current = 0;
    for (const a of N) {
        if (a > current) {
            current = a;
        } else {
            count += current - a;
        }
    }
    return count;
};
