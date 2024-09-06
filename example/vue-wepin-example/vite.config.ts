import path from 'path'
import inject from '@rollup/plugin-inject'
import vue from '@vitejs/plugin-vue'
import nodeStdlibBrowser from 'node-stdlib-browser'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // Using @rollup/plugin-inject for global, process, and Buffer polyfills
    {
      ...inject({
        global: [
          path.resolve(
            __dirname,
            'node_modules/node-stdlib-browser/helpers/esbuild/shim',
          ),
          'global',
        ],
        process: [
          path.resolve(
            __dirname,
            'node_modules/node-stdlib-browser/helpers/esbuild/shim',
          ),
          'process',
        ],
        Buffer: [
          path.resolve(
            __dirname,
            'node_modules/node-stdlib-browser/helpers/esbuild/shim',
          ),
          'Buffer',
        ],
      }),
      enforce: 'post',
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      ...nodeStdlibBrowser,
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext', // Enable Big integer literals
      define: {
        global: 'globalThis',
      },
      plugins: [
        // Additional plugins if required by node-stdlib-browser
      ],
    },
  },
  build: {
    target: 'esnext', // Enable Big integer literals
    commonjsOptions: {
      transformMixedEsModules: true, // Enable @walletconnect/web3-provider which has some code in CommonJS
    },
    rollupOptions: {
      plugins: [
        // Additional rollup plugins if required by node-stdlib-browser
      ],
    },
  },
})
