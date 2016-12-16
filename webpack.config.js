import path from "path";

const JS_RE = /\.js$/;
const IMG_FONTS_JSON_RE = /\.(jpg|png|woff|woff2|eot|ttf|svg|json)$/;
const SRC_PATH = [path.resolve(__dirname, "src/js")];
const RESOURCES_PATH = [path.resolve(__dirname, "src/resources")];
const ICONS_LIB_PATH = [path.resolve(__dirname, "node_modules/react-native-vector-icons")];

export default {

	devtool: "source-map",

	resolve: {
		root: SRC_PATH,
		extension: ["", ".js"],
		modulesDirectories: ["node_modules"]
	},

	entry: [
		"webpack-dev-server/client?http://localhost:8080",
		"webpack/hot/only-dev-server",
		"react-hot-loader/patch",
		"./index.web.js"
	],

	output: {
		path: path.join(__dirname, "build"),
		filename: "app.js",
		publicPath: "/"
	},

	module: {
		preLoaders: [
			{
				test: JS_RE,
				loader: "eslint-loader",
				exclude: /node_modules/
			}
		],

		loaders: [
			{
				test: JS_RE,
				loader: "babel-loader",
				exclude: /node_modules/,
				include: ["", SRC_PATH],
				plugins: ["transform-runtime"]
			},
			{
				test: IMG_FONTS_JSON_RE,
				loader: "file-loader",
				include: [SRC_PATH, RESOURCES_PATH, ICONS_LIB_PATH]
			}
		]
	}
};
