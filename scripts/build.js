import esbuild from 'esbuild';

const dev = process.argv[2] === '-dev';

export const build = async options => {
	const context = await esbuild.context({
		bundle: true,
		platform: 'node',
		target: 'es2020',
		logLevel: 'info',
		sourcemap: dev ? 'both' : false,
		minify: !dev,
		// minifyIdentifiers: false,
		minifyWhitespace: !dev,
		keepNames: dev,
		...options,
	});

	if (dev) {
		await context.watch();
	} else {
		await context.rebuild();
		await context.dispose();
	}
};
