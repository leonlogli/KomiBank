const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractPlugin = new ExtractTextPlugin({
	filename: '../../static/css/[name].css'
});

module.exports = {
	entry: {
		app: './src/app.js'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '../../static/js/[name].js'
	},
	module: {
		rules: [
			// sass-loader with sourceMap activated
			{
				test: /\.scss$/,
				include: [path.resolve(__dirname, 'src', 'sass')],
				use: extractPlugin.extract({
					use: [{
							loader: 'css-loader',
							options: {
								sourceMap: true,
								url: false
							}
						},
						{
							loader: 'postcss-loader',
							options: {
								plugins: () => [autoprefixer()],
							},
						},
						{
							loader: 'sass-loader',
							options: {
								includePaths: ['./node_modules'],
								sourceMap: true
							},
						}
					],
					fallback: 'style-loader'
				})
			},
			
			{
				test: /\.js$/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015'],
					plugins: ['transform-object-assign']
				},
			}
		],
	},

	plugins: [
		// extract-text-webpack-plugin instance
		extractPlugin
	],

	watch: true
};