import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { runFromCli, formatAnswer } from './lib.mjs';

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


(async () => {
    const module = await import(`./src/${argv.course}/${argv.problem}.mjs`);
    const solution = module.solution;

    if (argv.manual) {
        runFromCli(solution);
    } else {
        if (!module.testcases) {
            throw new Error('No testcases specified');
        }

        console.log(`Running ${argv.course} ${argv.problem} against default inputs`);
        for (const testcase of module.testcases) {
            const output = solution.call(null, testcase.input.split('\n'));
            if (output === undefined) {
                throw new Error('No solution yet');
            }

            const outputStr = formatAnswer(output);
            const isCorrect = (typeof testcase.output === 'string') ? outputStr === testcase.output : module.verify(outputStr);
            if (!isCorrect) {
                console.error('Incorrect output!');
            }
            console.log(outputStr);
        }
    }
})();
