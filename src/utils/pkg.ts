import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

interface PackageJson {
	readonly name: string;
	readonly version: string;
	readonly description: string;
}

const findPackageJson = (): PackageJson => {
	const currentDir = dirname(fileURLToPath(import.meta.url));
	// Walk up directories to find package.json
	let dir = currentDir;
	for (let i = 0; i < 10; i++) {
		try {
			const filePath = resolve(dir, 'package.json');
			const content = readFileSync(filePath, 'utf-8');
			return JSON.parse(content) as PackageJson;
		} catch {
			dir = dirname(dir);
		}
	}
	return { name: 'parakeet-mlx', version: '0.0.1', description: '' };
};

const pkg: PackageJson = findPackageJson();

export const getVersion = (): string => pkg.version;
export const getName = (): string => pkg.name;
export const getDescription = (): string => pkg.description;
