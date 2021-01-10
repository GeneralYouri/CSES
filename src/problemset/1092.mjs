export const verify = (output) => {
    if (output === 'NO') {
        return true;
    }
    const lines = output.split(/\n/g);
    const sum1 = lines[2].split(' ').map(Number).reduce((sum, n) => sum + n, 0);
    const sum2 = lines[4].split(' ').map(Number).reduce((sum, n) => sum + n, 0);
    return sum1 === sum2;
};

export const testcases = [
    {
        input: '7',
        output: verify,
    }, {
        input: '6',
        output: 'NO',
    },
];

export const solution = (lines) => {
    const n = Number(lines[0]);
    if (n % 4 === 1 || n % 4 === 2) {
        return ['NO'];
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
