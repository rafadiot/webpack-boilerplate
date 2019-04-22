const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const Webpack = require('webpack');

module.exports = {
	entry: './src/app.js',
	output: {
		filename: 'app.js',
		path: path.resolve(__dirname, 'dist/js')
	},
	module: {
		rules: [{
			test: /\.(scss)$/,
			use: [
				MiniCssExtractPlugin.loader,
				'css-loader',
				'postcss-loader',
				'sass-loader'
			]
		},
		{
			test: /\.pug$/,
			use: [
				'pug-loader'
			]
		},
		]
	},
	plugins: [
		new Webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			Util: 'exports-loader?Util!bootstrap/js/dist/util'
		}),
		new MiniCssExtractPlugin({
			filename: 'app.css',
			path: path.resolve(__dirname, 'dist/css')
		}),
		new HtmlWebpackPlugin({
			template: './src/pug/index.pug',
			filename: 'index.html',
			favicon: 'favicon.ico'
		}),
		new CopyWebpackPlugin([{
			from: path.resolve(__dirname, '../src/images'),
			to: path.resolve(__dirname, '../dist/images'),
			ignore: ['.*']
		}]),
		new BrowserSyncPlugin({
			host: 'localhost',
			port: 3000,
			server: {
				baseDir: ['dist']
			}
		}, {
			reload: false
		}),
	],
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				cache: true,
				parallel: true,
				sourceMap: true
			}),
			new OptimizeCSSAssetsPlugin({})
		]
	},
	devServer: {
		port: 3000,
	}
};
