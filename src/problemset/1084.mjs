export const testcases = [
    {
        input: '4 3 5\n'
            + '60 45 80 60\n'
            + '30 60 75',
        output: '2',
    },
];

export const solution = (lines) => {
    const [_n, _m, k] = lines[0].split(' ').map(Number);
    const A = lines[1].split(' ').map(Number).sort((a, b) => b - a);
    const B = lines[2].split(' ').map(Number).sort((a, b) => b - a);
    let assigned = 0;
    let i = 0;
    let j = 0;
    while (i < A.length && j < B.length) {
        let isValid = true;
        while (B[j] > A[i] + k) {
            j += 1;
            isValid = false;
        }
        while (A[i] > B[j] + k) {
            i += 1;
            isValid = false;
        }
        if (i < A.length && j < B.length && isValid) {
            assigned += 1;
            i += 1;
            j += 1;
        }
    }
    return assigned;
};
