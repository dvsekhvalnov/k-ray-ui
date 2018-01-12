const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const path = require('path');

const paths = {
	TARGET: path.resolve(__dirname, 'target'),
	SRC: path.resolve(__dirname, 'src'),
	JS: path.resolve(__dirname, 'src/js'),
};

module.exports = {
		entry: path.join(paths.JS, 'index.js'),
		output: {
			path: paths.TARGET,
			publicPath: '/',
			filename: "k-ray-ui.js"
		},

		resolve: {
			extensions: [".js", ".json", ".jsx"]
		},

		module: {
			rules: [
				{
					test: /\.jsx?$/,
					exclude: /node_modules/,
					use: [
						'babel-loader',
					],
				},
				{
					test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
					use: {
						loader: 'url-loader',
						options: {
							limit: 100000,
						}
					}
				},
				{
					test: /\.css$/,
					include: [
						/node_modules/,
						/src\/css/
					],
					use: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: [{
							loader: 'css-loader',
						}],
					})
				}
				],
			},

			plugins: [
				new HtmlWebpackPlugin({
					template: path.join(paths.SRC, 'index.html'),
				}),
				new ExtractTextPlugin('styles.css'),
				new CompressionPlugin({
				  asset: '[path].gz[query]',
				  algorithm: 'gzip',
				  test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
				  threshold: 10240,
				  minRatio: 0.8
				})
			],
		};
