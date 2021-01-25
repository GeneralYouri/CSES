import solution from './1643.mjs';

test('Provided test cases', () => {
    expect(solution(['8', '-1 3 -2 5 3 -5 2 2'])).toBe(9);
    expect(solution(['10', '1 1 1 1 1 1 1 1 1 1'])).toBe(10);
    expect(solution(['10', '-1 -1 -1 -1 -1 -1 -1 -1 -1 -1'])).toBe(-1);
    expect(solution(['2', '-3 -2'])).toBe(-2);
});
