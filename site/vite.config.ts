import path from 'path';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { additionalData } from './themeConfig';

export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      'antds': path.resolve(__dirname, '../components'),
    }
  },
  server: {
    host: true,
    port: 3000,
    open: true,
    hmr: true,
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true;@import "${require.resolve('../components/style/color/colorPalette.less')}";`,
          'root-entry-name': 'variable',
        },
        javascriptEnabled: true,
        // includePaths: ["node_modules/"],
        additionalData,
      },
    },
  },
});