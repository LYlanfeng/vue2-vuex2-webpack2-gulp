/**
 Gulpfile for gulp-webpack-demo
 created by lanfeng
*/

var gulp = require('gulp'),
    os = require('os'),
    gutil = require('gulp-util'),
//  sass = require('gulp-ruby-sass'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    gulpOpen = require('gulp-open'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    md5 = require('gulp-md5-plus'),
    fileinclude = require('gulp-file-include'),
    clean = require('gulp-clean'),
    spriter = require('gulp-css-spriter'),
    base64 = require('gulp-css-base64'),
    webpack = require('webpack'),
    webpackConfig = require('./webpack.config.js'),
    sourcemaps = require('gulp-sourcemaps'),
    postcss = require('gulp-postcss');
    autoprefixer = require('autoprefixer'),
    vinylPaths = require('vinyl-paths'),
    del = require('del'),
    connect = require('gulp-connect');

var host = {
    path: 'dist/',
    port: 3000,
    html: 'index.html'
};

//mac chrome: "Google chrome", 
var browser = os.platform() === 'linux' ? 'Google chrome' : (
  os.platform() === 'darwin' ? 'Google chrome' : (
  os.platform() === 'win32' ? 'chrome' : 'firefox'));
var pkg = require('./package.json');

//将图片拷贝到目标目录
gulp.task('copy:images', function (done) {
    gulp.src(['src/images/**/*']).pipe(gulp.dest('dist/images')).on('end', done);
});
//复制文字
gulp.task('copy:fonts', function (done) {
    gulp.src(['src/fonts/**/*']).pipe(gulp.dest('dist/fonts')).on('end', done);
});
//复制css
gulp.task('copy:css', function (done) {
    gulp.src(['src/css/*.css']).pipe(gulp.dest('dist/css')).on('end', done);
});
//压缩合并css, css中既有自己写的.less, 也有引入第三方库的.css
gulp.task('sass', function (done) {
////  gulp.src(['src/css/*.scss','src/css/*.css'])
//  gulp.src(['src/css/*.scss'])
//      .pipe(sass())
//      //这里可以加css sprite 让每一个css合并为一个雪碧图
//      //.pipe(spriter({}))
////      .pipe(concat('app.min.css'))
//      .pipe(gulp.dest('dist/css/'))
//      .on('end', done);
		 gulp.src(['src/css/*.css','src/css/*.scss'])       		  //压缩的文件
    	 .pipe(sourcemaps.init())
    	 .pipe(postcss([ autoprefixer() ]))
    	 .pipe(sass().on('error', sass.logError)) //解析sass
    	 .pipe(concat('app.min.css'))
    	 .pipe(sourcemaps.write('./'))				  //map映射文件
//       .pipe(minifycss())                		       //执行压缩
         .pipe(gulp.dest('dist/css'))		        //输出文件夹
         .on('end', done);
//	return sass('src/css/*.scss', { sourcemap: true })
//		.on('error', sass.logError)
//		.pipe(sourcemaps.init())
//	    // For file sourcemaps 
//		.pipe(concat('app.min.css'))
//		.pipe(sourcemaps.write('./'))
//      .pipe(gulp.dest('dist/css'))
//      .on('end', done);
});

//将js加上10位md5,并修改html中的引用路径，该动作依赖build-js
gulp.task('md5:js', ['build-js'], function (done) {
	var befor = vinylPaths();
    gulp.src('dist/js/**/*.js')
    	.pipe(befor)
    	.pipe(uglify())
        .pipe(md5(10, 'dist/app/**/*.html'))
        .pipe(gulp.dest('dist/js'))
        .on('end', function(){
        	console.log("finished md5:js");
        	del(befor.paths,done);
        });
});

//将css加上10位md5，并修改html中的引用路径，该动作依赖sprite
gulp.task('md5:css', ['sprite','build-js'], function (done) {
	var befor = vinylPaths();
    gulp.src('dist/css/*.css')
    	.pipe(befor)
        .pipe(md5(10, 'dist/app/**/*.html'))
        .pipe(gulp.dest('dist/css'))
        .on('end', function(){
        	console.log("finished md5:css");
        	del(befor.paths,done);
        });
});

//用于在html文件中直接include文件
gulp.task('fileinclude', function (done) {
    gulp.src(['src/app/**/*.html'])
        .pipe(fileinclude({
          prefix: '@@',
          basepath: '@file'
        }))
        .pipe(gulp.dest('dist/app'))
        .pipe(connect.reload())
        .on('end', done);
           
});

//雪碧图操作，应该先拷贝图片并压缩合并css
gulp.task('sprite', ['copy:images', 'sass'], function (done) {
    var timestamp = +new Date();
    gulp.src('dist/css/app.min.css')
        .pipe(spriter({
            spriteSheet: 'dist/images/spritesheet' + timestamp + '.png',
            pathToSpriteSheetFromCSS: '../images/spritesheet' + timestamp + '.png',
            spritesmithOptions: {
                padding: 10
            }
        }))
        .pipe(base64())
        .pipe(cssmin())
        .pipe(gulp.dest('dist/css'))
        .on('end', done);
});

gulp.task('clean', function (done) {
    return gulp.src(['dist'])
        .pipe(clean())
        ;
});

gulp.task('watch', function (done) {
    gulp.watch('src/**/*', ['sass', 'build-js', 'fileinclude'])
        .on('end', done);
});

gulp.task('connect', function () {
    console.log('connect------------');
    connect.server({
        root: host.path,
        port: host.port,
        livereload: true
    });
});

gulp.task('open', function (done) {
    gulp.src('')
        .pipe(gulpOpen({
            app: browser,
            uri: 'http://localhost:3000/app/'
        }))
        .on('end', done);
});

var myDevConfig = Object.create(webpackConfig);

var devCompiler = webpack(myDevConfig);

//引用webpack对js进行操作
gulp.task("build-js", ['fileinclude'], function(callback) {
    devCompiler.run(function(err, stats) {
        if(err) throw new gutil.PluginError("webpack:build-js", err);
        gutil.log("[webpack:build-js]", stats.toString({
            colors: true
        }));
        callback();
    });
});

//发布
gulp.task('default',['clean'], function () {
//	gulp.start('copy:fonts', 'md5:css', 'md5:js');
	gulp.start('connect', 'copy:fonts', 'md5:css', 'md5:js', 'open');
});

//开发
gulp.task('dev', ['connect', 'copy:fonts', 'copy:images', 'sass', 'build-js', 'watch', 'open']);

