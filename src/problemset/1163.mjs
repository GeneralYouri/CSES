import { runFromCli } from '~/library.mjs';
import { QuickSort } from '~/src/library.mjs';

const solution = (lines) => {
    const [x, n] = lines[0].split(' ').map(Number);
    const P = lines[1].split(' ').map(Number);
    const sorted = QuickSort([0, ...P, x]);

    // Setup "Doubly LinkedList" represented as prev,next
    const Prev = new Map();
    const Next = new Map();
    for (let i = 1; i < sorted.length - 1; i += 1) {
        const p = sorted[i];
        Prev.set(p, sorted[i - 1]);
        Next.set(p, sorted[i + 1]);
    }

    // Initialize longest passage length
    let longest = sorted.reduce((best, p, i) => Math.max(best, p - sorted[i - 1]));

    // Iteratively remove traffic lights and update longest passage length, collecting output
    const output = [];
    for (let i = n - 1; i >= 0; i -= 1) {
        output.push(longest);

        const p = P[i];
        const prev = Prev.get(p);
        const next = Next.get(p);

        const newLength = next - prev;
        if (newLength > longest) {
            longest = newLength;
        }

        Next.set(prev, next);
        Prev.set(next, prev);
    }

    return output.reverse().join(' ');
};
export default solution;

if (process.env.NODE_ENV !== 'test') {
    runFromCli(solution);
}
