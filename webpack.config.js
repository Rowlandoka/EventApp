'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
require('dotenv').config();
// const miniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	mode: 'development',
	// entry: './src/js/main.js',
	entry: {
		home: './src/js/home.js',
		about: './src/js/about.js',
		status: './src/js/status.js',
		// bundle: path.resolve(__dirname, './src/js/main.js'),
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
		clean: true,
		assetModuleFilename: '[name][ext]',
		// publicPath: '/dist/',
		// library: 'bundle',
	},
	devtool: 'source-map',
	devServer: {
		static: { directory: path.resolve(__dirname, 'dist') },
		port: 8080,
		hot: true,
		compress: true,
	},
	module: {
		rules: [
			{
				mimetype: 'image/svg+xml',
				scheme: 'data',
				type: 'asset/resource',
				generator: {
					filename: 'icons/[hash].svg',
				},
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
			{
				test: /\.(scss)$/,
				use: [
					// {
					// 	loader: miniCssExtractPlugin.loader,
					// },
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
					},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [autoprefixer],
							},
						},
					},
					{
						loader: 'sass-loader',
					},
				],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
						},
					},
				],
				exclude: path.resolve(__dirname, 'src/index.html'),
			},
		],
	},
	// plugins: [],
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './src/index.html',
		}),
		new webpack.ProvidePlugin({
			jQuery: 'jquery',
			$: 'jquery',
			jquery: 'jquery',
		}),
		// new miniCssExtractPlugin(),
		new webpack.DefinePlugin({
			NODE_ENV: JSON.stringify(process.env.NODE_ENV),
			SERVER_URL: JSON.stringify(process.env.SERVER_URL),
			GMAP_KEY: JSON.stringify(process.env.GMAP_KEY),
		}),
	],
};
