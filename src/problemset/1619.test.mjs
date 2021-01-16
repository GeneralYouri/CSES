import solution from './1619.mjs';

test('Provided test cases', () => {
    expect(solution((
        '3\n'
        + '5 8\n'
        + '2 4\n'
        + '3 9'
    ).split('\n'))).toBe(2);
});
