import { runFromCli } from '~/lib.mjs';

// An implementation of the Sieve of Eratosthenes, to generate all prime numbers below a given limit
/** @see http://www.luschny.de/math/factorial/scala/FactorialScalaCsharp.htm */
class PrimeSieve {
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
