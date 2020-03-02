// 1、导入gulp 这个第三方模块
const gulp = require('gulp')
// // 2.导入一个gulp-cssmin 这个第三方模块
const cssmin = require('gulp-cssmin')
//  // 2-1 导入一个gulp-autoprefixer 这个第三方模块
 const autoprefixer = require('gulp-autoprefixer')
//  3、导入一个gulp-uglify 这个第三方模块
const uglify = require('gulp-uglify')
// 3-1 导入一个gulp-babel 这个第三方模块
const babel = require('gulp-babel')
//  4、导入一个gulp-htmlmin 这个第三方模块
const htmlmin = require('gulp-htmlmin')
//  5、导入一个del这个第三方模块
 const del = require('del')
 //  6、导入一个gulp-webserver这个第三方模块
const webserver = require('gulp-webserver')




// 1.先写一个打包css的方法
const cssHandler = () => {
    return gulp.src('./src/css/*.css')//找到src目录下所有后缀为.css 的文件
         .pipe(autoprefixer())//给css文件自动添加前缀（兼容）
        .pipe(cssmin())//压缩css代码
        .pipe(gulp.dest('./dist/css'))//把压缩完毕的css代码放在dist目录下的css为后缀的文件
}
// 2.书写一个打包js的方法
const jsHandler = () => {

    return gulp.src('./src/js/*.js')
           .pipe(babel({
               presets:['@babel/env']
           }))//把es6转成es5
        .pipe(uglify())//压缩js代码
        .pipe(gulp.dest('./dist/js'))//把压缩完毕的js代码放在dist目录下的js为后缀的文件
}
// 3.书写一个打包html的方法
const htmlHandler = () => {
    return gulp.src('./src/pages/*.html')
        .pipe(htmlmin({
            removeAttributeQuotes: true,//移除属性上的双引号
            removeComments: true,//移除注释
            collapseBooleanAttributes: true,//把值为布尔值的属性简写
            collapseWhitespace: true,//移除所有空格，变成一行代码
            minifyCSS: true,//把页面里的style 标签里的css样式也去空格
            minifyJS: true,//把页面里的script 标签里的js代码也去空格
        }))
        .pipe(gulp.dest('./dist/pages'))
}
// 4.书写一个打包img文件的方法
const imgHandler = ()=>{
    return gulp.src('./src/images/**') //**所有格式的图片
               .pipe(gulp.dest('./dist/img'))
               
}
// 5.书写一个打包lib文件的方法
// 不压缩，直接转移
const libHandler = ()=>{
    return gulp.src('./src/lib/**') //**所有第三方工具
               .pipe(gulp.dest('./dist/lib'))
               
}
// 6.书写一个任务，自动删除dist目录（del)
const delHandler = () => {
    return del(['./dist'])
}

// 7.书写一个配置服务器的任务（gulp-webserver)
const serverHandler = ()=>{
    return gulp.src('./dist')//找到我要打开的页面文件夹，把这个文件夹当作网站的跟目录
               .pipe(webserver(
                   {
                     host:'localhost' ,//域名
                     port:8080,//端口号
                     open:'./pages/index.html',//默认打开的首页
                     livereload:true,//自动刷新浏览器 
                    //  proxies:[{
                    //      source:'./dd',//代理标识符
                    //      target:'http://127.0.0.1/test.php'//代理的地址
                    //  }]

                   }
               ))//开启服务器
}
// 8.自动监控文件（watch)
const watchHandler = ()=>{
    gulp.watch('./src/css/*.css',cssHandler)
    gulp.watch('./src/js/*.js',jsHandler)
    gulp.watch('./src/pages/*.html',htmlHandler)
    gulp.watch('./src/lib/**',libHandler)
    gulp.watch('./src/images/**',imgHandler)
}
// 9.书写一个打包video文件的方法
// 不压缩，直接转移
const videoHandler = ()=>{
    return gulp.src('./src/vedio/**') //**所有第三方工具
               .pipe(gulp.dest('./dist/vedio'))
               
}
// 导出一个默认任务
module.exports.default =gulp.series(
    delHandler,
    gulp.parallel(cssHandler,jsHandler,htmlHandler,imgHandler,libHandler,videoHandler),
    serverHandler,
    watchHandler
)

// // 导出以后，就可以在命令行执行gulp css的指令了
// module.exports.css = cssHandler
// module.exports.js = jsHandler
// module.exports.html = htmlHandler
// module.exports.img = imgHandler
// module.exports.lib = libHandler
