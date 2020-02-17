const path = require('path')
const EsmWebpackPlugin = require('@purtuga/esm-webpack-plugin')

module.exports = {
	mode: 'production',
	devtool: 'source-map',
	context: path.join(__dirname, './../src'),
	entry: [
		'./index.js'
	],
	output: {
		path: path.join(__dirname, './../'),
		publicPath: '/',
		filename: 'index.js',
		library: 'LIB',
		libraryTarget: 'var'
	},
	plugins: [
		new EsmWebpackPlugin()
	],
}