// The command line: node dist/cli.js <command> [arguments]. Add a command as one more case.
import { farewell, type FarewellLang } from './farewell.js';

const USAGE = 'usage: node dist/cli.js farewell <name> [--lang en|fr]';

const [command, ...args] = process.argv.slice(2);

function parseFarewellArgs(rawArgs: string[]): { name: string; lang: FarewellLang } {
  const nameParts: string[] = [];
  let lang: FarewellLang = 'en';

  for (let i = 0; i < rawArgs.length; i += 1) {
    if (rawArgs[i] === '--lang') {
      i += 1;
      lang = rawArgs[i] as FarewellLang;
    } else {
      nameParts.push(rawArgs[i]);
    }
  }

  return { name: nameParts.join(' '), lang };
}

switch (command) {
  case 'farewell':
    if (args.length === 0) {
      console.error(USAGE);
      process.exitCode = 2;
    } else {
      const { name, lang } = parseFarewellArgs(args);
      console.log(farewell(name, { lang }));
    }
    break;
  default:
    console.error(USAGE);
    process.exitCode = 2;
}
