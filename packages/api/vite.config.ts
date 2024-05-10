import { resolve } from 'path'
import { defineConfig } from 'vite'
import esNodePolyfills from 'vite-plugin-node-stdlib-browser'
import dts from 'vite-plugin-dts'
// import path from 'path'

export default defineConfig({
  plugins: [
    esNodePolyfills(),
    dts({
      // rollupTypes: true,
      insertTypesEntry: true,
    }),
  ],
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, 'src') }],
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: '@wepin/api-js',
      fileName: 'wepin-api-js',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          // vue: 'Vue',
        },
      },
    },
  },
})
