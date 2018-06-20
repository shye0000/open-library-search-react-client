import webpack from 'webpack';
import path from 'path';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HashPlugin from 'hash-webpack-plugin';
import WebpackAutoInject from 'webpack-auto-inject-version';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackHarddiskPlugin from 'html-webpack-harddisk-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';

const isDeveloping = process.env.NODE_ENV !== 'production';
const bundleAnalyzerHost = '0.0.0.0';
const bundleAnalyzerPort = 6866;
const webpackDevServerHost = '0.0.0.0';
const webpackDevServerPort = 6686;
const staticBuildPath = path.resolve('./build');

let jsFileName, cssFileName, devToolSourceMap, publicPath,
	pluginsConfig = [], styleLoaderConfig, lessLoaderConfig, entry;

if (isDeveloping) {
	//configuration for development
	styleLoaderConfig = [ 'style-loader', 'css-loader?sourceMap', 'postcss-loader?sourceMap', 'sass-loader?sourceMap' ];
	publicPath = 'http://' + webpackDevServerHost + ':' + webpackDevServerPort + '/';
	jsFileName = 'js/[name].js';
	cssFileName = 'css/[name].css';
	devToolSourceMap = 'cheap-module-source-map';
	pluginsConfig = [
		new webpack.HotModuleReplacementPlugin(),
		new BundleAnalyzerPlugin({ analyzerHost: bundleAnalyzerHost, analyzerPort: bundleAnalyzerPort})
	];
	entry = [
		'babel-polyfill',
		'whatwg-fetch',
		'react-hot-loader/patch',
		'webpack-dev-server/client?http://' + webpackDevServerHost + ':' + webpackDevServerPort,
		'webpack/hot/only-dev-server',
		'./src/front.js'
	];
	lessLoaderConfig = [
		{loader: 'style-loader'},
		{loader: 'css-loader'},
		{
			loader: 'postcss-loader',
			options: {
				plugins: function() {
					return [require('autoprefixer')];
				}
			}
		},
		{loader: 'less-loader'},
	];

} else {
	//configuration for prod, demo, preprod, build-test-prod
	styleLoaderConfig = ExtractTextPlugin.extract({
		fallback: 'style-loader',
		use: [
			{
				loader: 'css-loader',
				options: {
					sourceMap: false
				}
			},
			{
				loader: 'postcss-loader',
				options: {
					sourceMap: false
				}
			},
			{
				loader: 'sass-loader',
				options: {
					sourceMap: false
				}
			}
		]
	});
	lessLoaderConfig = ExtractTextPlugin.extract({
		fallback: 'style-loader',
		use: [
			{
				loader: 'css-loader',
				options: {
					sourceMap: false
				}
			},
			{
				loader: 'postcss-loader',
				options: {
					sourceMap: false,
					plugins: function() {
						return [require('autoprefixer')];
					}
				}
			},
			{
				loader: 'less-loader',
				options: {
					sourceMap: false
				}
			}
		]
	});
	publicPath = '';
	jsFileName = 'js/[name]-[hash].js';
	cssFileName = 'css/[name]-[hash].css';
	devToolSourceMap = 'none';
	pluginsConfig = [
		new ExtractTextPlugin({
			filename: cssFileName
		}),
		new HashPlugin({ path: staticBuildPath, fileName: 'hash.txt' }),
		new webpack.optimize.UglifyJsPlugin({
			comments: false,
			sourceMap: false,
			compress: {
				warnings: false,
				drop_console: true
			},
		}),
		new WebpackAutoInject({
			SILENT: true,
			componentsOptions: {
				InjectAsComment: {
					tag: 'Version: {version} - {date}',
					dateFormat: 'yyyy-mm-dd hh:MM:ss TT'
				}
			}
		})
	];
	entry =  [
		'babel-polyfill',
		'whatwg-fetch',
		'./src/front.js'
	];
}

const config = {
	entry: {
		front: entry
	},
	output: {
		path: staticBuildPath,
		publicPath: publicPath,
		filename: jsFileName,
		chunkFilename: jsFileName
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: 'babel-loader',
				exclude: {
					test: path.resolve(__dirname, 'node_modules'),
				}
			},
			{
				test: /\.svg$/,
				include: [
					path.resolve(__dirname, './icons')
				],
				loader: 'babel-loader!svg-react-loader'
			},
			{
				test: /\.(scss|css)$/,
				use: styleLoaderConfig
			},
			{
				test: /\.less$/,
				use: lessLoaderConfig
			},
			{
				test: /\.(png|jpg|gif)$/,
				loader: 'file-loader',
				options: {
					outputPath: 'files/',
					publicPath: publicPath
				}
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
				loader: 'file-loader',
				exclude: [
					path.resolve(__dirname, 'icons')
				],
				options: {
					outputPath: 'files/',
					publicPath: publicPath
				}
			},
			{
				test: /\.json($|\?)/,
				use: 'json-loader'
			}
		]
	},
	devServer: {
		host: webpackDevServerHost,
		port: webpackDevServerPort,
		hot: true,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
			'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
		},
		watchOptions: {
			ignored: /node_modules/
		}
	},
	devtool: devToolSourceMap,
	resolve: {
		alias: {
			react: path.resolve('./node_modules/react')
		},
	},
	plugins: [
		new CleanWebpackPlugin(['build'], {verbose: true}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
		}),
		new webpack.optimize.ModuleConcatenationPlugin(),
		new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/),
		new webpack.ContextReplacementPlugin(/antd[/\\]lib[/\\]locale-provider$/, /(en_US).js/),
		new HtmlWebpackPlugin({
			alwaysWriteToDisk: true,
			inject: false,
			minify: {
				collapseWhitespace: true
			},
			template: './src/index.ejs',
			appMountId: 'main',
			// todo if needed
			// googleAnalytics: {
			// 	trackingId: 'UA-XXXX-XX', // todo to be corrected with the real value
			// 	pageViewOnLoad: true
			// },
			meta: [
				{
					name: 'open-library-search-react-client',
					content: 'open-library-search-react-client'
				}
			],
			mobile: true,
			lang: 'en',
			title: 'open-library-search-react-client'
		}),
		new HtmlWebpackHarddiskPlugin(),
		...pluginsConfig
	]
};

module.exports = config;