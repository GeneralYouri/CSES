import solution from './1070.mjs';

// Verify only that the provided solution is *a* valid solution, in case multiple valid solutions exist
const verify = (fn, input) => {
    const output = fn(input);
    if (output === 'NO SOLUTION') {
        return true;
    }

    const n = Number(input[0]);
    const integers = output.trim().split(' ');
    return integers.length === n && integers.every((integer, i) => i === 0 || Math.abs(integer - integers[i - 1]) !== 1);
};

test('Provided test cases', () => {
    expect(verify(solution, ['5'])).toBe(true);
    expect(solution(['3'])).toBe('NO SOLUTION');
});
