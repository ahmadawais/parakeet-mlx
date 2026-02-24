import { describe, expect, it } from 'vitest';
import { getDescription, getName, getVersion } from '../pkg.js';

describe('pkg utilities', () => {
	it('should return version from package.json', () => {
		const version = getVersion();
		expect(version).toBe('0.0.1');
	});

	it('should return package name', () => {
		const name = getName();
		expect(name).toBe('parakeet-mlx');
	});

	it('should return package description', () => {
		const description = getDescription();
		expect(typeof description).toBe('string');
		expect(description.length).toBeGreaterThan(0);
	});
});
