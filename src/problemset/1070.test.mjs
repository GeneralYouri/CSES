import solution from './1070.mjs';

// Verify only that the provided solution is *a* valid solution, in case multiple valid solutions exist
const verify = (output) => {
    if (output === 'NO SOLUTION') {
        return true;
    }
    const integers = output.split(' ');
    return integers.every((n, i) => i === 0 || Math.abs(n - integers[i - 1]) !== 1);
};

test('Provided test cases', () => {
    expect(verify(solution(['5']))).toBe(true);
    expect(solution(['3'])).toBe('NO SOLUTION');
});
