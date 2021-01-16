import { runFromCli } from '~/library.mjs';

const solution = (lines) => {
    const reserved = lines.map(row => row.split('').map(cell => cell === '*'));
    const height = reserved.length;
    const width = reserved[0].length;
    const cols = Array(8).fill(false);
    const diagonals1 = Array(15).fill(false);
    const diagonals2 = Array(15).fill(false);

    let count = 0;
    const search = (row) => {
        if (row === height) {
            count += 1;
            return;
        }
        for (let col = 0; col < width; col += 1) {
            if (cols[col] || diagonals1[row + col] || diagonals2[row - col + 7] || reserved[row][col]) {
                continue;
            }

            cols[col] = true;
            diagonals1[row + col] = true;
            diagonals2[row - col + 7] = true;
            search(row + 1);
            diagonals2[row - col + 7] = false;
            diagonals1[row + col] = false;
            cols[col] = false;
        }
    };
    search(0);
    return count;
};
export default solution;

if (process.env.NODE_ENV !== 'test') {
    runFromCli(solution);
}
