export const testcases = [
    {
        input: '4 10\n'
            + '7 2 3 9',
        output: '3',
    },
];

export const solution = (lines) => {
    const [_n, x] = lines[0].split(' ').map(Number);
    const P = lines[1].split(' ').map(Number).sort((a, b) => b - a);
    let i = 0;
    let j = P.length - 1;
    let gondolas = 0;
    while (i <= j) {
        while (P[i] + P[j] > x && i < j) {
            gondolas += 1;
            i += 1;
        }
        if (i > j) {
            break;
        }
        gondolas += 1;
        i += 1;
        j -= 1;
    }
    return gondolas;
};
