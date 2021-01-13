import solution from './1755.mjs';

const verify = (fn, input) => {
    const output = fn(input);
    if (output === 'NO SOLUTION') {
        return true;
    }

    return output.split('').every((char, i) => char === output[output.length - 1 - i]);
};

test('Provided test cases', () => {
    expect(verify(solution, ['AAAACACBA'])).toBe(true);
});
