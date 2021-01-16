import solution from './1624.mjs';

test('Provided test cases', () => {
    expect(solution((
        '........\n'
        + '........\n'
        + '..*.....\n'
        + '........\n'
        + '........\n'
        + '.....**.\n'
        + '...*....\n'
        + '........'
    ).split('\n'))).toBe(65);
});
