import solution from './1629.mjs';

test('Provided test cases', () => {
    expect(solution((
        '3\n'
        + '3 5\n'
        + '4 9\n'
        + '5 8'
    ).split('\n'))).toBe(2);
});
