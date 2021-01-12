import solution from './2205.mjs';

const countDifferentBits = (a, b) => {
    let count = 0;
    for (let n = 1; n <= a || n <= b; n <<= 1) {
        if ((a & n) !== (b & n)) {
            count += 1;
        }
    }
    return count;
};

const verify = (lines) => {
    return lines.every((line, i) => {
        if (i === 0) {
            return true;
        }
        const a = Number.parseInt(line, 2);
        const b = Number.parseInt(lines[i - 1], 2);
        return countDifferentBits(a, b) === 1;
    });
};

test('Provided test cases', () => {
    expect(verify(solution(['2']))).toBe(true);
});
