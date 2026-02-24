import { Command } from 'commander';
import { registerTranscribeCommand } from './commands/index.js';
import {
	getDescription,
	getName,
	getVersion,
	printBanner,
} from './utils/index.js';

const createCli = (): Command => {
	const program = new Command();
	const name = getName();
	const version = getVersion();
	const description = getDescription();

	program
		.name(name)
		.description(description)
		.version(version, '-v, --version')
		.helpOption('-h, --help', 'Display help information')
		.hook('preAction', () => {
			printBanner();
		});

	registerTranscribeCommand(program);

	return program;
};

const main = (): void => {
	const program = createCli();

	// Show banner + help when no arguments are provided
	if (process.argv.length <= 2) {
		printBanner();
		program.outputHelp();
		return;
	}

	program.parse(process.argv);
};

main();
