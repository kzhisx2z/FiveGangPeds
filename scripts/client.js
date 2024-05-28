import { build } from './build.js';

build({
	entryPoints: ['src/client/ped.ts'],
	outfile: 'build/client.js',
});
