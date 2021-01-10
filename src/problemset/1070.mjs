export const verify = (output) => {
    if (output === 'NO SOLUTION') {
        return true;
    }
    const integers = output.split(' ');
    return integers.every((n, i) => i === 0 || Math.abs(n - integers[i - 1]) !== 1);
};

export const testcases = [
    {
        input: '5',
        output: verify,
    }, {
        input: '3',
        output: 'NO SOLUTION',
    },
];

export const solution = (lines) => {
    const n = Number(lines[0]);
    if (n === 1) {
        return 1;
    } else if (n < 4) {
        return 'NO SOLUTION';
    }

    let output = '';
    let a = 2;
    while (a <= n) {
        output += ' ' + a;
        a += 2;
    }
    a = 1;
    while (a <= n) {
        output += ' ' + a;
        a += 2;
    }
    return output;
};
