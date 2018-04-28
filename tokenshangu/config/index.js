'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')


// 添加tokent 时需要添加
const ssoproxy = require('webpack-dev-server-ssoproxy')({
  host: process.env.SSO_PROXY_HOST,
  port: process.env.SSO_PROXY_PORT,
  userName: process.env.SSO_PROXY_USERNAME,
  password: process.env.SSO_PROXY_PASSWORD,
  nonce: process.env.SSO_PROXY_NONCE,
  // outputDir: 'src',
  // dbgJsSuffix: '-dev_dbg.js',
  clientId: 0,
  context: [ // TODO 需要根据当前项目的SERVER端替换来自于《信采》的配置。
      '/api/v2/integral/'
  ]
});
module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
   
    // proxyTable: {
    //   '/api': {
    //       target: 'http://192.168.40.199:7921',
    //       changeOrigin: true,
    //       pathRewrite: {
    //           '^/api': 'http://192.168.40.199:7921'
    //       }
    //   }
    // },

    // 添加tokent 时需要添加
    before: ssoproxy.before,
    proxyTable: [{
      context: ssoproxy.context,
      target: ssoproxy.targetUrl,
      onProxyReq: ssoproxy.proxy.onProxyReq,
      onProxyRes: ssoproxy.proxy.onProxyRes,
      onError: ssoproxy.proxy.onError,
      pathRewrite(path){
        console.log(path);
          return path;
      }
    }],

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    
    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
