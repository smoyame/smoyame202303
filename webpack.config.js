const path = require("path");

module.exports = {
	mode: "development",
	entry: "./src/script.js",
	output: {
		filename: "script.js",
		sourceMapFilename: "script.js.map",
		path: path.resolve(__dirname, "public"),
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: [/node_modules/, path.resolve(__dirname, "./src/_data/")],
			},
		],
	},
};
