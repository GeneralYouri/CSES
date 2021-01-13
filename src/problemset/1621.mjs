import { runFromCli } from '~/lib.mjs';

const solution = (lines) => {
    const _n = lines[0].split(' ').map(Number);
    const X = lines[1].split(' ').map(Number);
    return new Set(X).size;
};
export default solution;

if (process.env.NODE_ENV !== 'test') {
    runFromCli(solution);
}
