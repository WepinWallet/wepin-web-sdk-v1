// import { resolve } from 'path'
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
    alias: [{ find: '@', replacement: 'src' }],
  },
  build: {
    target: ['es2015'], // ES2015로 타겟 설정
    lib: {
      entry: 'src/index.ts',
      name: '@wepin/fetch-js',
      fileName: 'wepin-fetch-js',
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
