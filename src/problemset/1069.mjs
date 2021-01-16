import { runFromCli } from '~/library.mjs';

const solution = (lines) => {
    const dna = (lines[0] + '_').split('');
    let best = 0;
    let length = 0;
    let type = '';
    for (const nucleotide of dna) {
        if (nucleotide === type) {
            length += 1;
        } else {
            if (length > best) {
                best = length;
            }
            length = 1;
            type = nucleotide;
        }
    }
    return best;
};
export default solution;

if (process.env.NODE_ENV !== 'test') {
    runFromCli(solution);
}
