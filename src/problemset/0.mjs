export const testcases = [
    {
        output: '8',
        input: [
            '3 5',
        ],
    }, {
        output: '-2',
        input: [
            '-6 4',
        ],
    },
];

export const solution = (lines) => {
    const [a, b] = lines[0].split(' ').map(Number);
    return a + b;
};
