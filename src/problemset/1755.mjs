import { runFromCli } from '~/lib.mjs';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const solution = (lines) => {
    const counts = alphabet.reduce((acc, char) => {
        acc[char] = 0;
        return acc;
    }, {});
    for (let i = 0; i < lines[0].length; i += 1) {
        counts[lines[0][i]] += 1;
    }
    const middleChars = alphabet.filter(char => counts[char] % 2 === 1);
    if (middleChars.length > 1) {
        return 'NO SOLUTION';
    }

    const middle = middleChars[0] || '';
    counts[middle] -= 1;
    return alphabet.reduce((str, char) => char.repeat(counts[char] / 2) + str + char.repeat(counts[char] / 2), middle);
};
export default solution;

if (process.env.NODE_ENV !== 'test') {
    runFromCli(solution);
}
