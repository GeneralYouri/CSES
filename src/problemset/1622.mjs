import { runFromCli } from '~/lib.mjs';

const permutationsUnique = (permutationOptions) => {
    if (permutationOptions.length <= 1) {
        return [permutationOptions];
    }

    const permutations = [];
    const smallerPermutations = permutationsUnique(permutationOptions.slice(1));
    const firstOption = permutationOptions[0];

    for (const smallerPermutation of smallerPermutations) {
        for (let positionIndex = 0; positionIndex <= smallerPermutation.length; positionIndex += 1) {
            const prefix = smallerPermutation.slice(0, positionIndex);
            const suffix = smallerPermutation.slice(positionIndex);
            permutations.push([...prefix, firstOption, ...suffix]);
        }
    }

    return permutations;
};

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
