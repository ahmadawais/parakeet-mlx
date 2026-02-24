import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { printBanner } from '../banner.js';

describe('banner', () => {
	let consoleSpy: ReturnType<typeof vi.spyOn>;

	beforeEach(() => {
		consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
	});

	afterEach(() => {
		consoleSpy.mockRestore();
		vi.unstubAllEnvs();
	});

	it('should print wide banner for terminals >= 80 cols', () => {
		vi.stubEnv('COLUMNS', '100');
		Object.defineProperty(process.stdout, 'columns', {
			value: 100,
			configurable: true,
		});

		printBanner();

		expect(consoleSpy).toHaveBeenCalled();
		const output = consoleSpy.mock.calls.map((call) => call[0]).join('\n');
		expect(output).toContain('██████');
	});

	it('should print compact banner for terminals < 80 cols', () => {
		Object.defineProperty(process.stdout, 'columns', {
			value: 60,
			configurable: true,
		});

		printBanner();

		expect(consoleSpy).toHaveBeenCalled();
		const output = consoleSpy.mock.calls.map((call) => call[0]).join('\n');
		expect(output).toContain('___');
	});
});
