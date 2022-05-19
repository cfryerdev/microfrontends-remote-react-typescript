const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const deps = require("./package.json").dependencies;

module.exports = {
	entry: "./src/index.ts",
	mode: "development",
	devServer: {
		port: {REPLACE_PORT},
		open: false,
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js"],
		alias: {
			'@shared': path.resolve(__dirname, '../../shared')
		}
	},
	output: {
		publicPath: 'http://localhost:{REPLACE_PORT}/',
	},
	module: {
		rules: [ 
			{ test: /\.(js|jsx|tsx|ts)$/, loader: "ts-loader", exclude: /node_modules/ },
			{ test: /\.(css|scss|sass)$/, use: ["style-loader", "css-loader"]}
		],
	},
	plugins: [
		new ModuleFederationPlugin({
			name: "remote_{REPLACE_NAME}",
			filename: 'remote.js',
			exposes: {
				'./Application': './src/_app',
      			},
			shared: {
				...deps,
				'react': {
					singleton: true,
					requiredVersion: deps.react,
				},
				'react-dom': {
					singleton: true,
					requiredVersion: deps['react-dom'],
				},
			},
		}),
		new HtmlWebpackPlugin({
			template: "./public/index.html",
		}),
	],
};
