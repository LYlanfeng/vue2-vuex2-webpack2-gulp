#积分宝宝系统

1：vue2 webpack gulp自动构建

2：使用element ui组件，其中css自动提取出来会形成一个elementui.css文件放在dist/css下

3：css使用sass进行解析并统一合并成app.min.css

4：js支持ES6标准


---
PS：为了支持类似fis的`__inline`和`__sprite`语法（base64和雪碧图），对依赖包`gulp-css-base64`和`gulp-css-spriter`都做了修改，所以暂时保留在node_modules中。不必再下载这两个包。

##开发使用
`npm install`  
如果有未找到的依赖请手动进行安装
PS:node-sass安装失败 在群里下载.node文件 在cmd命令中：set SASS_BINARY_PATH=F:/win32-x64-48_binding.node
然后在安装node-sass，安装之后需要将文件拷贝到node-sass/vendor/ 下面，同时，将win32-x64-48作为文件夹名称，binding.node作为文件放在win32-x64-48下

####开发：
`gulp dev`

####发布：
`gulp`
##搭建过程整理（主要其中遇到的坑）
1. 加入了vue-template-compiler模块.vue文件解析。
2. 参考官网webpack例子，使用的是"webpack": "^2.1.0-beta.25"版本，但是后面使用vue构建工具创建的项目"webpack": "^1.13.2"，这个没现在没具体去看有什么区别
3. webpack2.x版本整个写法已经有了不同。比如：*-loader，之前1.x版本不用加-loader。然后vue自己的loader需要写在options属性中。
4. webpack中别名alias需要指定vue的路径，因为其中会存在其他版本vue会引起的错误。
5. vue2不支持body渲染。组件中跟节点只允许存在一个。
6. extract-text-webpack-pluginy需要使用2.0的版本跟webpack匹配，以及在webpack写法不同

