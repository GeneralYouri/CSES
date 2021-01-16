export const permutationsUnique = (permutationOptions) => {
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

export const subsetSums = (A) => {
    const length = 1 << A.length;
    const output = Array(length);
    for (let i = 0; i < length; i += 1) {
        let sum = 0;
        for (let j = 0; j < A.length; j += 1) {
            if (i & (1 << j)) {
                sum += A[j];
            }
        }
        output[i] = sum;
    }
    return output;
};
