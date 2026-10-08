// The command line: node dist/cli.js <command> [arguments]. Add a command as one more case.
import { farewell } from './farewell.js';

const USAGE = 'usage: node dist/cli.js farewell <name>';

const [command, ...args] = process.argv.slice(2);

switch (command) {
  case 'farewell':
    if (args.length === 0) {
      console.error(USAGE);
      process.exitCode = 2;
    } else {
      console.log(farewell(args.join(' ')));
    }
    break;
  default:
    console.error(USAGE);
    process.exitCode = 2;
}
