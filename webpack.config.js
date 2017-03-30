var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var path = require('path');
var webpack = require('webpack');
var fs = require('fs');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var srcDir = path.resolve(process.cwd(), 'src');

//获取多页面的每个入口文件，用于配置中的entry
function getEntry() {
	var jsPath = path.resolve(srcDir, 'app');
//	console.log("jsPath", jsPath);
	var dirs = fs.readdirSync(jsPath);
	var matchs = [],
		files = {};
	//  console.log("dirs="+JSON.stringify(dirs))
	dirs.forEach(function(item) {
		matchs = item.match(/(.+)\.js$/);
		//      console.log(matchs);
		if(matchs) {
			files[matchs[1]] = path.resolve(srcDir, 'app', item);
		} else {
			if(!item.match(/(.+)\.html$/)) {
				files = Object.assign({}, files, getEntry2(jsPath, item));
			}
		}
	});
//	console.log("files=" + JSON.stringify(files));
	return files;
}

function getEntry2(dirPath, dirName) {
	var jsPath = path.resolve(dirPath, dirName);
	var dirs = fs.readdirSync(jsPath);
	var matchs = [],
		files = {};
	//  console.log("dirs2="+JSON.stringify(dirs))
	dirs.forEach(function(item) {
		matchs = item.match(/(.+)\.js$/);
		//      console.log(matchs);
		if(matchs) {
			files[dirName + "/" + matchs[1]] = path.resolve(dirPath, dirName, item);
		} else {
			if(!item.match(/(.+)\.html$/)) {
				files = Object.assign({}, files, getEntry2(dirPath, dirName + "/" + item));
			}
		}
	});
	//  console.log("files2="+JSON.stringify(files));
	return files;
}

module.exports = {
	cache: true,
//	devtool: "source-map",
	entry: getEntry(),
	output: {
		path: path.join(__dirname, "dist/"),
		publicPath: "/",
		filename: "js/[name].js",
		chunkFilename: "[chunkhash].js"
	},
	module: {
		rules: [{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					// vue-loader options go here
					loaders: {
						scss: ['vue-style-loader', 'css-loader', 'sass-loader'].join('!')
					}
				}
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
//				loader: 'style-loader!css-loader'
				loader: ExtractTextPlugin.extract({
					fallbackLoader: "style-loader",
				    loader: "css-loader"
				})
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
				loader: 'file-loader',
				query: {
		          name: 'fonts/[name].[ext]'
		        }
			},
			{
		        test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
		        loader: 'file-loader',
		        query: {
		          name: 'images/[name].[ext]?[hash]',
		          limit: 25000
		        }
		    }
		]
	},
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.common.js',
			'LF': srcDir + "/js/framework/lf.js"
		}
	},
	plugins: [
		new CommonsChunkPlugin({
			name: 'common',
			filename: "js/common.js",
		 	minChunks: 3 // 提取使用3次以上的模块，打包到vendor里
		}),
		new ExtractTextPlugin('css/elementui.css')
		// new uglifyJsPlugin({
		//     compress: {
		//         warnings: false
		//     }
		// })
	]
};