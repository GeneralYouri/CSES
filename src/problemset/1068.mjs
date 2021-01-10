export const testcases = [
    {
        input: '3',
        output: '3 10 5 16 8 4 2 1',
    },
];

export const solution = (lines) => {
    let n = Number(lines[0]);
    const output = [n];
    while (n !== 1) {
        if (n % 2 === 0) {
            n /= 2;
        } else {
            n = 3 * n + 1;
        }
        output.push(n);
    }
    return output.join(' ');
};
