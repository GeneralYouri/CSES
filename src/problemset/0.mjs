export const testcases = [
    {
        input: '3 5',
        output: '8',
    }, {
        input: '-6 4',
        output: '-2',
    },
];

export const solution = (lines) => {
    const [a, b] = lines[0].split(' ').map(Number);
    return a + b;
};
