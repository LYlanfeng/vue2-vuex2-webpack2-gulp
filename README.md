#厨房进度监控系统 v1.0
##实现方式
1：采用webpack+gulp+vue形式进行开发

2：样式编写采用sass

---
PS：为了支持类似fis的`__inline`和`__sprite`语法（base64和雪碧图），对依赖包`gulp-css-base64`和`gulp-css-spriter`都做了修改，所以暂时保留在node_modules中。不必再下载这两个包。
##开发使用
`npm install`  
如果有未找到的依赖请手动进行安装
####开发：
`gulp dev`

####发布：
`gulp`
##编写目的
1. 帮助厨房实时监控事务处理进度
2. 实时监控异常进行
