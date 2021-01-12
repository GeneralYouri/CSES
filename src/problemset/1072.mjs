import { runFromCli } from '../../lib.mjs';

const solution = (lines) => {
    const n = Number(lines[0]);
    const output = [];
    for (let k = 1; k <= n; k += 1) {
        output.push((k - 1) * (k + 4) * (k * k - 3 * k + 4) / 2);
    }
    return output;
};
export default solution;

if (!process.stdin.isTTY) {
    runFromCli(solution);
}
