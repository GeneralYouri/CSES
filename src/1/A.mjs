import { runFromCli } from '~/lib.mjs';

const solution = (lines) => {
    const [a, b] = lines[0].split(' ').map(Number);
    return a + b;
};
export default solution;

if (process.env.NODE_ENV !== 'test') {
    runFromCli(solution);
}
