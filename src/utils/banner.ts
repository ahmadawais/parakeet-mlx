import pc from 'picocolors';

// ANSI Shadow style (for wide terminals ≥80 cols)
const BANNER_WIDE = `
 ██████╗  █████╗ ██████╗  █████╗ ██╗  ██╗███████╗███████╗████████╗
 ██╔══██╗██╔══██╗██╔══██╗██╔══██╗██║ ██╔╝██╔════╝██╔════╝╚══██╔══╝
 ██████╔╝███████║██████╔╝███████║█████╔╝ █████╗  █████╗     ██║
 ██╔═══╝ ██╔══██║██╔══██╗██╔══██║██╔═██╗ ██╔══╝  ██╔══╝     ██║
 ██║     ██║  ██║██║  ██║██║  ██║██║  ██╗███████╗███████╗   ██║
 ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝   ╚═╝
                              ███╗   ███╗██╗     ██╗  ██╗
                              ████╗ ████║██║     ╚██╗██╔╝
                              ██╔████╔██║██║      ╚███╔╝
                              ██║╚██╔╝██║██║      ██╔██╗
                              ██║ ╚═╝ ██║███████╗██╔╝ ██╗
                              ╚═╝     ╚═╝╚══════╝╚═╝  ╚═╝
`;

// Compact style (for narrow terminals <80 cols)
const BANNER_COMPACT = `
 ___  _   ___  _   _  ___ ___ ___
 | _ \\/ \\ | _ \\/ \\ | |/ /| __| __|_  _
 |  _/ _ \\|   / _ \\|   < | _||  _| ||
 |_|/_/ \\_\\_|_/_/ \\_\\_|\\_\\|___|___|\\__|
           __  __ _   __  __
          |  \\/  | | / \\ \\/ /
          | |\\/| | |_\\ X / >  <
          |_|  |_|___/_/\\_\\/_/\\_\\
`;

const getTerminalWidth = (): number => {
	if (process.stdout.columns) {
		return process.stdout.columns;
	}
	const envCols = process.env.COLUMNS;
	if (envCols) {
		const parsed = Number.parseInt(envCols, 10);
		if (!Number.isNaN(parsed)) {
			return parsed;
		}
	}
	return 80;
};

export const printBanner = (): void => {
	const cols = getTerminalWidth();
	const banner = cols >= 80 ? BANNER_WIDE : BANNER_COMPACT;
	const lines = banner.split('\n');

	for (const line of lines) {
		console.log(pc.white(line));
	}
};
