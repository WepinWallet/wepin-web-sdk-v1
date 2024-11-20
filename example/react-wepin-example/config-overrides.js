const path = require('path') // path 모듈 추가
const webpack = require('webpack')
const nodeStdlibBrowser = require('node-stdlib-browser')

module.exports = function override(config, env) {
  // superstruct 관련 오류
  // it's possible to continue using .cjs modules
  // https://github.com/facebook/create-react-app/pull/12021
  config.module.rules = config.module.rules.map((rule) => {
    if (rule.oneOf instanceof Array) {
      rule.oneOf[rule.oneOf.length - 1].exclude = [
        /\.(js|mjs|jsx|cjs|ts|tsx)$/,
        /\.html$/,
        /\.json$/,
      ]
    }
    return rule
  })

  // Webpack plugins 설정
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser', // Vite와 유사한 환경 설정
      Buffer: ['buffer', 'Buffer'], // Buffer 객체의 브라우저 환경 대체
      globalThis: 'globalthis', // globalThis 폴리필
    }),
  )

  // source-map-loading관련 오류
  // source-map-loader rule을 찾습니다.
  const sourceMapLoader = config.module.rules.find(
    (rule) => rule.loader && rule.loader.includes('source-map-loader'),
  )
  // 특정 라이브러리를 제외시킵니다.
  if (sourceMapLoader) {
    sourceMapLoader.exclude = [
      /node_modules\/@solana\/buffer-layout/,
      /node_modules\/eth-rpc-errors/,
      /node_modules\/superstruct/,
      /node_modules\/json-rpc-engine/,
      /node_modules\/@metamask\/safe-event-emitter/, // 추가된 부분
      // /node_modules\/@metamask/, // 추가된 부분
      // 필요한 다른 라이브러리도 추가 가능
    ]
  }

  // Resolve 설정에 alias와 Polly fill 설정
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'), // 프로젝트 루트에서 src 폴더를 import할 때 '@' 사용
      ...nodeStdlibBrowser,
      '@metamask/utils': path.resolve(
        __dirname,
        'node_modules/@metamask/utils',
      ),
    },
    fallback: {
      ...config.resolve.fallback,
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      zlib: require.resolve('browserify-zlib'),
      stream: require.resolve('stream-browserify'),
      crypto: require.resolve('crypto-browserify'),
      vm: require.resolve('vm-browserify'),
      buffer: require.resolve('buffer/'),
    },
  }

  // 반환된 config로 Webpack 빌드 진행
  return config
}
