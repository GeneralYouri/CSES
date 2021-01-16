import { runFromCli } from '~/library.mjs';

const solution = (lines) => {
    const n = Number(lines[0]);
    const N = lines[1].split(' ').map(Number);
    const seen = Array(n + 1).fill(false);
    seen[0] = true;
    for (const a of N) {
        seen[a] = true;
    }
    return seen.indexOf(false);
};
export default solution;

if (process.env.NODE_ENV !== 'test') {
    runFromCli(solution);
}
