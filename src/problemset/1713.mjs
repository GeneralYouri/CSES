import { runFromCli } from '~/library.mjs';
import { PrimeSieve } from '~/src/library.mjs';

const solution = (N) => {
    // Pregenerate primes
    const limit = 1e6;
    const primes = [];
    const memo = Array.from(Array(1e6));
    const sieve = new PrimeSieve(limit);
    sieve.iterator(1, limit - 1, (prime) => {
        primes.push(prime);
        memo[prime] = 2;
    });

    // Count divisors
    let output = '';
    for (let i = 1; i < N.length; i += 1) {
        const n = Number(N[i]);
        if (n === 1) {
            output += '\n' + 1;
            continue;
        }

        if (memo[n] !== undefined) {
            output += '\n' + memo[n];
            continue;
        }

        let count = 1;
        let remaining = n;

        for (const prime of primes) {
            let div = remaining / prime;
            if ((~~div) === div) {
                let hits = 1;
                do {
                    remaining = div;
                    hits += 1;
                    div = remaining / prime;
                } while ((~~div) === div);
                count *= hits;

                if (remaining === 1) {
                    break;
                }

                if (memo[remaining] !== undefined) {
                    count *= memo[remaining];
                    break;
                    // } else {
                    //     memo[n / remaining] = count;
                }
            }
        }

        memo[n] = count;
        output += '\n' + count;
    }
    return output;
};
export default solution;

if (process.env.NODE_ENV !== 'test') {
    runFromCli(solution);
}
