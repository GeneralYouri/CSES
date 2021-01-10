import readline from 'readline';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

// TODO: Use yargs Commands
const argv = yargs(hideBin(process.argv))
    .options({
        course: {
            alias: ['c'],
            string: true,
            default: 'problemset',
            describe: 'The course to run',
        },
        problem: {
            alias: ['p'],
            string: true,
            default: 0,
            implies: 'course',
            describe: 'The problem to run',
        },
        manual: {
            alias: ['user', 'custom', 'm'],
            type: 'boolean',
            default: false,
            describe: 'Whether to run expecting user input (otherwise automatically runs against predefined inputs).',
        },
    })
    .alias({ help: 'h', version: 'v' })
    .argv;


const formatAnswer = (answer) => {
    let output = answer;
    if (Array.isArray(answer)) {
        if (Array.isArray(answer[0])) {
            output = output.map(o => o.join(' '));
        }
        output = output.join('\n');
    }
    return output.toString();
};

(async () => {
    const module = await import(`./src/${argv.course}/${argv.problem}.mjs`);
    const solution = module.solution;

    if (argv.manual) {
        const handle = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });
        let lines = [];
        handle.on('line', (line) => {
            // Custom indication of input end to also allow manual input and multi inputs, mostly for development testing
            if (line === ' ') {
                const answer = solution.call(null, lines);
                console.log(formatAnswer(answer));
                lines = [];
            } else {
                lines.push(line);
            }
        });
        handle.on('close', () => {
            const answer = solution.call(null, lines);
            console.log(formatAnswer(answer));
        });
    } else {
        if (!module.testcases) {
            throw new Error('No testcases specified');
        }

        console.log(`Running ${argv.course} ${argv.problem} against default inputs`);
        for (const testcase of module.testcases) {
            const output = solution.call(null, testcase.input);
            if (output === undefined) {
                throw new Error('No solution yet');
            }

            const outputStr = formatAnswer(output);
            const answerStr = formatAnswer(testcase.output);
            if (outputStr !== answerStr) {
                console.error('Incorrect output!');
            }
            console.log(outputStr);
        }
    }
})();
