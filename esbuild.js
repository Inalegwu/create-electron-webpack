/* eslint-disable @typescript-eslint/no-var-requires */
require('esbuild').build({
  entryPoints: ['./src/cli.ts'],
  platform: 'node',
  bundle: true,
  minify: true,
  outdir: './dist',
});
