#vue2+vuex2+webpack+gulp 自动构建框架

1：vue2和vuex2组件化开发

2：webpack和gulp自动构建

3：css使用sass进行解析并统一合并成app.min.css

4：js支持ES6标准


---
PS：为了支持类似fis的`__inline`和`__sprite`语法（base64和雪碧图），对依赖包`gulp-css-base64`和`gulp-css-spriter`都做了修改，所以暂时保留在node_modules中。不必再下载这两个包。
##开发使用
`npm install`  
如果有未找到的依赖请手动进行安装
####开发：
`gulp dev`

####发布：
`gulp`
##搭建过程整理（主要其中遇到的坑）
