import { defineConfig, transformWithEsbuild } from 'vite';

export default defineConfig({
  optimizeDeps: { esbuildOptions: { loader: { ".js": "jsx" } } },
  plugins: [{
    name: 'jsx-in-js-files',
    enforce: 'pre',
    async transform(code, id) {
      if (!/\/src\/.*\.js$/.test(id)) return null;
      return transformWithEsbuild(code, id, { loader: 'jsx', jsx: 'automatic' });
    },
  }],
});
