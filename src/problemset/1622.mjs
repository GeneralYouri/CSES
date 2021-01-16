import { runFromCli } from '~/library.mjs';
import { permutationsUnique } from '~/src/library.mjs';

const solution = (lines) => {
    const permutations = permutationsUnique(lines[0].split('')).map(permutation => permutation.join(''));
    const sortedUnique = Array.from(new Set(permutations)).sort();
    sortedUnique.unshift(sortedUnique.length);
    return sortedUnique;
};
export default solution;

if (process.env.NODE_ENV !== 'test') {
    runFromCli(solution);
}
