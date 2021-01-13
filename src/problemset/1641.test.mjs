import solution from './1641.mjs';

const verify = (fn, input) => {
    const output = fn(input);
    if (output === 'IMPOSSIBLE') {
        return true;
    }

    const [_n, x] = input[0].split(' ').map(Number);
    const [a, b, c] = output;
    console.log(a, b, c);
    return a + b + c === x;
};

test('Provided test cases', () => {
    expect(verify(solution, ['4 8', '2 7 5 1'])).toBe(true);
});
