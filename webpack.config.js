const path = require('path');

const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtensionManifestWebpackPlugin = require('./webpack/ExtensionManifestWebpackPlugin.js');
const ZipWebpackPlugin = require('zip-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

if (!isProduction && process.env.NODE_ENV !== 'development') {
	// Prefer alerting that we're not being verbose about the node environment.
	throw new Error('Unknown NODE_ENV.');
}

// Get a list of plugins; varies based on the environment we're building for.
const plugins = [
	new CleanWebpackPlugin(['dist']),
	new webpack.EnvironmentPlugin(['NODE_ENV']),
	new webpack.optimize.CommonsChunkPlugin({ name: 'common' }),
	new ExtensionManifestWebpackPlugin(
		require('./package.json'),
		{ pretty: !isProduction }
	)
];

if (isProduction) {
	plugins.push(
		new webpack.optimize.UglifyJsPlugin(),
		new ZipWebpackPlugin({
			path: path.join(__dirname, 'dist'),
			filename: 'extension.zip'
		})
	);
} else {
	// If ever needed, development-only plugins go here.
}

module.exports = {
	entry: {
		main: ['babel-polyfill', path.join(__dirname, 'src', 'main', 'main.ts')],
		background: ['babel-polyfill', path.join(__dirname, 'src', 'background', 'main.ts')]
	},
	output: {
		path: path.join(__dirname, 'dist', 'extension'),
		filename: '[name].bundle.js'
	},
	target: 'web',
	devtool: process.env.NODE_ENV === 'development' ? 'source-map' : false,

	module: {
		rules: [
			{
				test: /\.ts$/,
				loader: 'ts-loader'
			}
		]
	},

	resolve: {
		extensions: ['.ts', '.js']
	},

	plugins: plugins
};
