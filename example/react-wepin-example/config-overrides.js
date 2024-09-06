const webpack = require('webpack')

module.exports = function override(config, env) {
  // Webpack plugins 설정
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser.js',
    }),
  )

  // Polyfill 설정
  config.resolve.fallback = {
    ...config.resolve.fallback,
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    zlib: require.resolve('browserify-zlib'),
    stream: require.resolve('stream-browserify'),
    // buffer: require.resolve('buffer/'),
  }

  // 반환된 config로 Webpack 빌드 진행
  return config
}
