import { type Command, Option } from 'commander';
import ora from 'ora';
import pc from 'picocolors';

interface TranscribeOptions {
	readonly output: string;
	readonly format: string;
	readonly chunkDuration: string;
	readonly beamSize: string;
	readonly dtype: string;
	readonly verbose: boolean;
	readonly local?: boolean;
}

export const registerTranscribeCommand = (program: Command): void => {
	program
		.command('transcribe')
		.description('Transcribe audio files using Parakeet ASR models')
		.argument('<files...>', 'Audio files to transcribe (WAV, MP3, etc.)')
		.option('-o, --output <path>', 'Output directory', '.')
		.option(
			'-f, --format <type>',
			'Output format (txt, srt, vtt, json, all)',
			'txt',
		)
		.option(
			'--chunk-duration <seconds>',
			'Chunk duration for long audio files',
			'0',
		)
		.option('--beam-size <size>', 'Beam size for beam search decoding', '1')
		.option('--dtype <type>', 'Model precision (fp32, bf16)', 'bf16')
		.option('--verbose', 'Enable verbose logging', false)
		.addOption(new Option('--local').hideHelp())
		.action(async (files: readonly string[], opts: TranscribeOptions) => {
			await handleTranscribe(files, opts);
		});
};

const handleTranscribe = async (
	files: readonly string[],
	options: TranscribeOptions,
): Promise<void> => {
	if (files.length === 0) {
		console.error(pc.red('Error: No audio files provided.'));
		process.exit(1);
	}

	const spinner = ora({
		text: `Transcribing ${String(files.length)} file(s)…`,
	}).start();

	try {
		for (const file of files) {
			spinner.text = `Transcribing ${pc.dim(file)}…`;

			if (options.verbose) {
				spinner.info(
					`Processing: ${file} (format: ${options.format}, dtype: ${options.dtype})`,
				);
				spinner.start();
			}

			// Placeholder for actual transcription logic
			// This will be implemented with the Python backend integration
			await new Promise((resolve) => setTimeout(resolve, 100));

			spinner.succeed(`Transcribed ${pc.green(file)}`);

			if (files.indexOf(file) < files.length - 1) {
				spinner.start();
			}
		}
	} catch (error: unknown) {
		const message = error instanceof Error ? error.message : 'Unknown error';
		spinner.fail(pc.red(`Transcription failed: ${message}`));
		process.exit(1);
	}
};
