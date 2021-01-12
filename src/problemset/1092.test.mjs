import solution from './1092.mjs';

const verify = (lines) => {
    if (lines === 'NO') {
        return true;
    }
    const sum1 = lines[2].map(Number).reduce((sum, n) => sum + n, 0);
    const sum2 = lines[4].map(Number).reduce((sum, n) => sum + n, 0);
    return sum1 === sum2;
};

test('Provided test cases', () => {
    expect(verify(solution(['7']))).toBe(true);
    expect(solution(['6'])).toBe('NO');
});
