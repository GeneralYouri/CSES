/** region QuickSort */
// const partition = (A, low, high) => {
//     const pivot = A[(high + low) >> 1];
//     let i = low;
//     let j = high;
//     while (true) {
//         while (A[i] < pivot) {
//             i += 1;
//         }
//         while (A[j] > pivot) {
//             j -= 1;
//         }
//         if (i >= j) {
//             return j;
//         }
//         [A[i], A[j]] = [A[j], A[i]];
//     }
// };
//
// export const QuickSort = (A, low = 0, high = A.length - 1) => {
//     if (low < high) {
//         const pivot = partition(A, low, high);
//         QuickSort(A, low, pivot);
//         QuickSort(A, pivot + 1, high);
//     }
//     return A;
// };

const partition = (A, pivot, low, high) => {
    let i = low;
    let j = low;
    let k = high;
    while (j <= k) {
        if (A[j] < pivot) {
            [A[i], A[j]] = [A[j], A[i]];
            i += 1;
            j += 1;
        } else if (A[j] > pivot) {
            [A[j], A[k]] = [A[k], A[j]];
            k -= 1;
        } else {
            j += 1;
        }
    }
    return [i, j];
};

export const QuickSort = (A, low = 0, high = A.length - 1) => {
    if (low < high) {
        const pivot = A[Math.floor((high + low) / 2)];
        const [left, right] = partition(A, pivot, low, high);
        QuickSort(A, low, left - 1);
        QuickSort(A, right, high);
    }
    return A;
};

/*
const partition = (A, low, high, sortFn) => {
    const pivot = A[(high + low) >> 1];
    let i = low;
    let j = high;
    while (true) {
        while (sortFn(A[i], pivot) < 0) {
            i += 1;
        }
        while (sortFn(A[j], pivot) > 0) {
            j -= 1;
        }
        if (i >= j || sortFn(A[i], A[j]) === 0) {
            return i;
        }
        [A[i], A[j]] = [A[j], A[i]];
    }
};

export const QuickSort = (A, low = 0, high = A.length - 1, sortFn = (a, b) => a - b) => {
    if (low < high) {
        const pivot = partition(A, low, high, sortFn);
        QuickSort(A, low, pivot, sortFn);
        QuickSort(A, pivot + 1, high, sortFn);
    }
    return A;
};
 */
/** endregion */

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

// An implementation of the Sieve of Eratosthenes, to generate all prime numbers below a given limit
/** @see http://www.luschny.de/math/factorial/scala/FactorialScalaCsharp.htm */
export class PrimeSieve {
    constructor(n) {
        this.bitsPerInt = 32;
        this.mask = this.bitsPerInt - 1;
        this.log2Int = 5;
        this.sieveLen = 0;

        this.PrimesOnBits = [1762821248, 848611808, 3299549660, 2510511646];
        this.isComposite = null;
        this.init(n);
    }

    init(n) {
        this.sieveLen = n;
        if (n < 386) {
            this.isComposite = this.PrimesOnBits;
            return;
        }

        this.isComposite = Array.from(Array(Math.floor(n / (3 * this.bitsPerInt) + 1)));
        let d1 = 8;
        let d2 = 8;
        let p1 = 3;
        let p2 = 7;
        let s = 7;
        let s2 = 3;
        let l = 0;
        let c = 1;
        const max = Math.floor(n / 3);
        let inc = 0;
        let toggle = false;

        while (s < max) {
            if ((this.isComposite[l >> this.log2Int] & (1 << (l & this.mask))) === 0) {
                inc = p1 + p2;
                for (c = s; c < max; c += inc) {
                    this.isComposite[c >> this.log2Int] |= 1 << (c & this.mask);
                }
                for (c = s + s2; c < max; c += inc) {
                    this.isComposite[c >> this.log2Int] |= 1 << (c & this.mask);
                }
            }
            l += 1;
            toggle = !toggle;
            if (toggle) {
                s += d2;
                d1 += 16;
                p1 += 2;
                p2 += 2;
                s2 = p2;
            } else {
                s += d1;
                d2 += 8;
                p1 += 2;
                p2 += 6;
                s2 = p1;
            }
        }
    }

    iterator(min, max, visitor) {
        if (min < 2) {
            min = 2;
        }
        if (max > this.sieveLen) {
            throw new Error('Max larger than sieve.');
        }

        if (min <= 2 && max >= 2) {
            visitor(2);
        }
        if (min <= 3 && max >= 3) {
            visitor(3);
        }

        const absPos = Math.trunc((min + (min + 1) % 2) / 3 - 1);
        let index = Math.trunc(absPos / this.bitsPerInt);
        let bitPos = Math.trunc(absPos % this.bitsPerInt);
        let toggle = (bitPos & 1) === 1;
        let prime = 5 + 3 * (this.bitsPerInt * index + bitPos) - (bitPos & 1);

        while (prime <= max) {
            let bitField = this.isComposite[index] >> bitPos;
            index += 1;
            while (bitPos < this.bitsPerInt) {
                if ((bitField & 1) === 0) {
                    visitor(prime);
                }
                toggle = !toggle;
                prime += toggle ? 2 : 4;
                if (prime > max) {
                    return;
                }
                bitField >>= 1;
                bitPos += 1;
            }
            bitPos = 0;
        }
    }
}
