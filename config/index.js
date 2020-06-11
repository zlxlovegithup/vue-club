'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
	dev: {

		// Paths
		assetsSubDirectory: 'static',
		assetsPublicPath: '/',
    //配置了代理路径
		proxyTable: {
			'/api': {
				target: 'http://localhost:8081',
				// target: 'http://localhost:8010',
				changeOrigin: true,
				pathRewrite: {
					'^/api': '/club/api'  //这种接口配置出来 请求：http://localhost:80/api
                                // ----> 代理路径： http://localhost:8081/club/api
				},
			},
			'/admin': {
				target: 'http://localhost:8082',
				changeOrigin: true,
				pathRewrite: {
					'^/admin': '/club/admin' //这种接口配置出来 请求：http://localhost:80/admin
                                   // ----> 代理路径： http://localhost:8082/club/admin
				}
			},
			'/fileServer': {
				target: 'http://localhost:8013',
				// target: 'http://localhost:8010',
				changeOrigin: true,
				pathRewrite: {
					'^/fileServer': '/fileServer'  //这种接口配置出来 请求：http://localhost:80/fileServer
                               // ----> 代理路径： http://localhost:8013/fileServer
				}
			}
		},

		// Various Dev Server settings
		host: 'localhost', // can be overwritten by process.env.HOST
		port: 80, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
		autoOpenBrowser: false,
		errorOverlay: true,
		notifyOnErrors: true,
		poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

		// Use Eslint Loader?
		// If true, your code will be linted during bundling and
		// linting errors and warnings will be shown in the console.
		useEslint: true,
		// If true, eslint errors and warnings will also be shown in the error overlay
		// in the browser.
		showEslintErrorsInOverlay: false,

		/**
		 * Source Maps
		 */

		// https://webpack.js.org/configuration/devtool/#development
		devtool: 'cheap-module-eval-source-map',

		// If you have problems debugging vue-files in devtools,
		// set this to false - it *may* help
		// https://vue-loader.vuejs.org/en/options.html#cachebusting
		cacheBusting: true,

		cssSourceMap: false
	},

	build: {
		// Template for index.html
		index: path.resolve(__dirname, '../dist/index.html'),

		// Paths
		assetsRoot: path.resolve(__dirname, '../dist'),
		assetsSubDirectory: 'static',
		assetsPublicPath: './',
		proxyTable: {
			'/api': {
				target: 'http://localhost:8081',
				// target: 'http://localhost:8010',
				changeOrigin: true,
				pathRewrite: {
					'^/api': '/club/api'
				}
			}
			// '/api': 'http://localhost:8010/club/api/'
		},
		/**
		 * Source Maps
		 */

		productionSourceMap: false,
		// https://webpack.js.org/configuration/devtool/#production
		devtool: '#source-map',

		// Gzip off by default as many popular static hosts such as
		// Surge or Netlify already gzip all static assets for you.
		// Before setting to `true`, make sure to:
		// npm install --save-dev compression-webpack-plugin
		productionGzip: true,
		productionGzipExtensions: ['js', 'css'],

		// Run the build command with an extra argument to
		// View the bundle analyzer report after build finishes:
		// `npm run build --report`
		// Set to `true` or `false` to always turn it on or off
		bundleAnalyzerReport: process.env.npm_config_report
	}
}
