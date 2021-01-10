export const testcases = [
    {
        input: '8',
        output: '0\n'
            + '6\n'
            + '28\n'
            + '96\n'
            + '252\n'
            + '550\n'
            + '1056\n'
            + '1848',
    },
];

export const solution = (lines) => {
    const n = Number(lines[0]);
    const output = [];
    for (let k = 1; k <= n; k += 1) {
        output.push((k - 1) * (k + 4) * (k * k - 3 * k + 4) / 2);
    }
    return output;
};
