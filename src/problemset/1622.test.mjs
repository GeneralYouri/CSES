import solution from './1622.mjs';

test('Provided test cases', () => {
    expect(solution(['aabac']).join('\n')).toBe('20\naaabc\naaacb\naabac\naabca\naacab\naacba\nabaac\nabaca\nabcaa\nacaab\nacaba\nacbaa\nbaaac\nbaaca\nbacaa\nbcaaa\ncaaab\ncaaba\ncabaa\ncbaaa');
});
