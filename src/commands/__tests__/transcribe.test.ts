import { Command } from 'commander';
import { describe, expect, it } from 'vitest';
import { registerTranscribeCommand } from '../transcribe.js';

describe('transcribe command', () => {
	it('should register the transcribe command', () => {
		const program = new Command();
		registerTranscribeCommand(program);

		const transcribeCmd = program.commands.find(
			(cmd) => cmd.name() === 'transcribe',
		);
		expect(transcribeCmd).toBeDefined();
	});

	it('should have the expected options', () => {
		const program = new Command();
		registerTranscribeCommand(program);

		const transcribeCmd = program.commands.find(
			(cmd) => cmd.name() === 'transcribe',
		);
		expect(transcribeCmd).toBeDefined();

		const optionNames = transcribeCmd?.options.map((o) => o.long) ?? [];
		expect(optionNames).toContain('--output');
		expect(optionNames).toContain('--format');
		expect(optionNames).toContain('--chunk-duration');
		expect(optionNames).toContain('--beam-size');
		expect(optionNames).toContain('--dtype');
		expect(optionNames).toContain('--verbose');
	});

	it('should hide the --local option from help', () => {
		const program = new Command();
		registerTranscribeCommand(program);

		const transcribeCmd = program.commands.find(
			(cmd) => cmd.name() === 'transcribe',
		);
		expect(transcribeCmd).toBeDefined();

		const localOption = transcribeCmd?.options.find(
			(o) => o.long === '--local',
		);
		expect(localOption).toBeDefined();
		expect(localOption?.hidden).toBe(true);
	});
});
