var sh = require('shelljs');
var fs = require('fs');
var del = require('del');
var vinylPaths = require('vinyl-paths');
var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var _ = require('lodash');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var minifyJS = require('gulp-uglify');
var inject = require('gulp-inject');
var concat = require('gulp-concat');
var runSequence = require('run-sequence');
var nano = require('gulp-cssnano');
var replace = require('gulp-replace-task');
var templateCache = require('gulp-angular-templatecache');
var ngAnnotate = require('gulp-ng-annotate');
var streamqueue = require('streamqueue');
var imagemin = require('gulp-imagemin');
var jpegtran = require('imagemin-jpegtran');
var pngquant = require('imagemin-pngquant');
var rename = require('gulp-rename');
var path = require('path');
var Server = require('karma').Server;
var protractor = require("gulp-protractor").protractor;

// Start a standalone server
var webdriver_standalone = require('gulp-protractor').webdriver_standalone;
// Download and update the selenium driver
var webdriver_update = require('gulp-protractor').webdriver_update;

var paths = {
    distFiles: 'dist/**/**.*',
    gulpFile: 'gulpfile.js',
    distCSS: 'dist/css',
    distJS: 'dist/js',
    dist: 'dist',
    mainModuleName: 'starter',

    src: {
        assetsFile: 'www/assets.json',
        index: 'www/index.html',
        fonts: 'www/lib/ionic/release/fonts/**.*',
        imgs: 'www/img/**/**.*',
        jpgs:'www/img/**/**.jpg',
        pngs: 'www/img/**/**.png',
        path: 'www/',
        css: 'www/css/**/**.*',
        sass: ['./scss/**/*.scss'],
        js: 'www/js/**/**.*',
        templates: 'www/templates/**/**.html',
        jsonForTest: 'www/phones/**/**.*'
    },

    dest: {
        fonts: 'dist/fonts',
        imgs: 'dist/img'
    },

    configFiles: {
        dev: "config/development.json",
        prod: "config/production.json"
    }
};

/** 默认任务是 编译sass 为css*/
gulp.task('default', ['sass']);

gulp.task('sass', function (done) {
    gulp.src('./scss/ionic.app.scss')
        //.pipe(sass({
        //    errLogToConsole: true
        //}))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./www/css/'))
        //.pipe(minifyCss({
        //    keepSpecialComments: 0
        //}))
        .pipe(nano())
        .pipe(rename({extname: '.min.css'}))
        .pipe(gulp.dest('./www/css/'))
        .on('end', done);
});

/** 监测 sass代码变化，触发编译*/
gulp.task('watch', function () {
    gulp.watch(paths.src.sass, ['sass']);
});

/** 调用bower 安装组件包，并检查git*/
gulp.task('install', ['git-check'], function () {
    return bower.commands.install()
        .on('log', function (data) {
            gutil.log('bower', gutil.colors.cyan(data.id), data.message);
        });
});

/** 检查git是否安装*/
gulp.task('git-check', function (done) {
    if (!sh.which('git')) {
        console.log(
            '  ' + gutil.colors.red('Git is not installed.'),
            '\n  Git, the version control system, is required to download Ionic.',
            '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
            '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
        );
        process.exit(1);
    }
    done();
});



/*=====================================
 * =           单元测试                    =
 * ====================================*/

/** 对www目录 运行一次单元测试 */
gulp.task('test_www', function (cb) {
    var config = {
        configFile: __dirname + '/test/karma.www.conf.js',
        singleRun: true,
        autoWatch: false
    };

    var server = new Server(config, cb);
    server.start();
});

/** 对www运行一次测试后，监控目录，发生变化就触发单元测试。
 * 持续集成：使用karma来进行TDD开发 */
gulp.task('test-dev', function (cb) {
    var config = {
        configFile: __dirname + '/test/karma.www.conf.js',
        singleRun: false,
        autoWatch: true
    };

    var server = new Server(config, cb);
    server.start();
});

/** 当发布式构建时，对dist目录 运行一次单元测试 */
gulp.task('test_dist', function (cb) {
    var config = {
        configFile: __dirname + '/test/karma.www.conf.js',
        singleRun: true,
        autoWatch: false
    };

    var server = new Server(config, cb);
    server.start();
});


/*======================================
 =            端到端测试                =
 ======================================*/
// Downloads the selenium webdriver
gulp.task('webdriver_update', webdriver_update);

// Start the standalone selenium server
// NOTE: This is not needed if you reference the
// seleniumServerJar in your protractor.conf.js
gulp.task('webdriver_standalone', webdriver_standalone);

gulp.task('protractor', function (cb) {
    gulp.src(["/tests/e2e/**/*.js"])
        .pipe(protractor({
            configFile: "test/protractor-conf.js"
        }))
        .on('error', function(e) {
            console.log(e)
        }).on('end', cb);
});


// *************************************************
// GULP DEV :
// 创建，清理根目录下的dist目录，拷贝www目录下index.html, todo:template模板, 字体，图片到dist目录；
// 编译合并www目录下css文件，合并js文件 ，并输出到dist目录;
// 在index.html 中插入替换 合并后的 css和js文件引用;
// 对www目录开启文件变动监测，有变化自动执行上述流程
// 注意：dev系列任务构建结果只能做为开发测试使用，不能作为产品发布。
// todo: 单元测试
// ************************************************
gulp.task('dev:pipeline', ['devTasks']);

gulp.task('devTasks', function (callback) {
    runSequence(
        'test_www',
        'dev:clean',
        'dev:processFonts',
        'dev:processImgs',
        'jsonfortest',
        'dev:processCSS',
        'dev:processJS',
        'dev:inject',
        'dev:watch',
        callback
    );
});

/*==================================
 =  拷贝测试用json，注意链接后台调试以及正式发布，不要包含该构建    =
 ==================================*/

gulp.task('jsonfortest', function () {
    return gulp.src(paths.src.jsonForTest)
        .pipe(gulp.dest(path.join(paths.dist, 'phones')));
});

gulp.task('dev:clean', function () {
    return gulp.src(paths.distFiles).pipe(vinylPaths(del));
});

gulp.task('dev:processFonts', function () {
    return gulp.src(paths.src.fonts)
        .pipe(gulp.dest(paths.dest.fonts));
});

gulp.task('dev:processImgs', function () {
    return gulp.src(paths.src.imgs)
        .pipe(gulp.dest(paths.dest.imgs));
});

gulp.task('dev:processCSS', function (done) {
    var assetsCSS = JSON.parse(fs.readFileSync(paths.src.assetsFile, 'utf8')).css;

    var sources = _.map(assetsCSS, function (asset) {
        var css = '.css';
        var sass = '.scss';
        var extension = '';

        var pathWithoutExtension = paths.src.path + asset;

        if (fs.existsSync(pathWithoutExtension + css)) {
            extension = css;
        } else if (fs.existsSync(pathWithoutExtension + sass)) {
            extension = sass;
        } else {
            return '';
        }

        return pathWithoutExtension + extension;
    });

    return gulp.src(sources)
        //.pipe(sass({errLogToConsole: true}))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.distCSS))
});

gulp.task('dev:processJS', function () {
    var assetsJS = JSON.parse(fs.readFileSync(paths.src.assetsFile, 'utf8')).js;

    var sources = _.map(assetsJS, function (asset) {
        return paths.src.path + asset + '.js';
    });

    var env = 'dev';
    var configs = JSON.parse(fs.readFileSync(paths.configFiles[env], 'utf8'));

    var patterns = _.map(configs, function (value, key) {
        return {match: key, replacement: value};
    });

    gulp.src([paths.src.templates])
        .pipe(templateCache({root: 'templates/', module: paths.mainModuleName}))
        .pipe(gulp.dest(paths.distJS));

    return gulp.src(sources)
        .pipe(replace({patterns: patterns}))
        .pipe(gulp.dest(paths.distJS));
});

gulp.task('dev:inject', function () {
    var assetsCSS = JSON.parse(fs.readFileSync(paths.src.assetsFile, 'utf8')).css;
    var sourcesCSS = _.map(assetsCSS, function (asset) {
        return paths.distCSS + '/' + _.last(asset.split('/')) + '.css';
    });

    var assetsJS = JSON.parse(fs.readFileSync(paths.src.assetsFile, 'utf8')).js;
    var sourcesJS = _.map(assetsJS, function (asset) {
        return paths.distJS + '/' + _.last(asset.split('/')) + '.js';
    });

    sourcesJS.push(paths.distJS + '/templates.js');

    var srcOptions = {base: paths.dist, read: false};
    var injectOptions = {ignorePath: paths.dist, addRootSlash: false};

    return gulp.src(paths.src.index)
        .pipe(inject(gulp.src(sourcesJS, srcOptions), injectOptions))
        .pipe(inject(gulp.src(sourcesCSS, srcOptions), injectOptions))
        .pipe(gulp.dest(paths.dist))
});

gulp.task('dev:watch', function () {
    // FONTS
    watch(paths.src.fonts, function () {
        gulp.start('dev:processFonts');
    });

    // IMGS
    watch(paths.src.imgs, function () {
        gulp.start('dev:processImgs');
    });

    // CSS
    var cssSources = [
        paths.src.css,
        paths.src.assetsFile
    ];

    watch(cssSources, function () {
        gulp.start('dev:processCSS');
    });

    // JS
    var jsSources = [
        paths.src.js,
        paths.src.assetsFile,
        paths.src.templates
    ].concat(_.values(paths.configFiles));

    watch(jsSources, function () {
        gulp.start('dev:processJS');
        gulp.start('test_www');
    });

    // INJECT
    var injectSources = [
        paths.src.assetsFile,
        paths.src.index
    ];

    watch(injectSources, function () {
        gulp.start('dev:inject');
    });
});


/*******************************************************
// GULP PROD: 产品发布构建

// 创建，清理根目录下的dist目录，拷贝www目录下index.html, 字体，图片（对png，jpg后缀进行压缩处理）到dist目录；
// 编译合并www目录下css文件, 压缩处理，并输出到dist目录;
// 把template目录下的模板编译为js文件，与其他js 合并城一个js文件，对Angular依赖注入自动加入显示引用，压缩处理，输出到dist目录
// 在index.html 中插入替换 合并后的 css和js文件引用;
// todo: 其他格式图片的压缩处理， 单元测试，场景测试， js代码质量检查, source map支持
// **********************************************************/

gulp.task('prod:pipeline', ['prodTasks']);

gulp.task('prodTasks', function (callback) {
    runSequence(
        'dev:clean',
        'prod:processFonts',
        //'prod:processImgs',
        'prod:jpgmin',
        'prod:pngmin',
        'jsonfortest',
        'prod:concatCSS',
        'prod:precompileCSS',
        'prod:minifyCSS',
        'prod:concatJS',
        'prod:replaceJS',
        'prod:minifyJS',
        'prod:inject',
        'prod:clean',
        'test_dist',
        callback
    );
});

gulp.task('prod:processFonts', function () {
    return gulp.src(paths.src.fonts)
        .pipe(gulp.dest(paths.dest.fonts));
});


// 任务：压缩jpg
gulp.task('prod:jpgmin',function(){
    return gulp.src(paths.src.jpgs)
        .pipe(imagemin({
            progressive: true,
            use:[jpegtran()]
        }))
        .pipe(gulp.dest(paths.dest.imgs));
});

// 任务：压缩png
gulp.task('prod:pngmin',function(){
    return gulp.src(paths.src.pngs)
        .pipe(imagemin({
            quality: '65-80',
            speed: 4,
            use:[pngquant()]
        }))
        .pipe(gulp.dest(paths.dest.imgs));
});

gulp.task('prod:concatCSS', function () {
    var assetsCSS = JSON.parse(fs.readFileSync(paths.src.assetsFile, 'utf8')).css;

    var sources = _.map(assetsCSS, function (asset) {
        var css = '.css';
        var sass = '.scss';
        var extension = '';

        var pathWithoutExtension = paths.src.path + asset;

        if (fs.existsSync(pathWithoutExtension + css)) {
            extension = css;
        } else if (fs.existsSync(pathWithoutExtension + sass)) {
            extension = sass;
        } else {
            return '';
        }

        return pathWithoutExtension + extension;
    });

    return gulp.src(sources)
        .pipe(concat('application.css'))
        .pipe(gulp.dest(paths.distCSS))
});

gulp.task('prod:precompileCSS', function (done) {
    return gulp.src(paths.distCSS+'/application.css')
        .pipe(sass({errLogToConsole: true}))
        .pipe(gulp.dest(paths.distCSS));
});

gulp.task('prod:minifyCSS', function (done) {
    return gulp.src(paths.distCSS+'/application.css')
        //.pipe(minifyCss())
        .pipe(nano())
        .pipe(gulp.dest(paths.distCSS));
});

gulp.task('prod:concatJS', function () {
    var assetsJS = JSON.parse(fs.readFileSync(paths.src.assetsFile, 'utf8')).js;
    var sources = _.map(assetsJS, function (asset) {
        return paths.src.path + asset + '.js';
    });


    return streamqueue({objectMode: true},
        gulp.src(sources),
        gulp.src([paths.src.templates]).pipe(templateCache({root: 'templates/', module: paths.mainModuleName}))
    )
        .pipe(concat('application.js'))
        .pipe(ngAnnotate())
        .pipe(gulp.dest(paths.distJS))
});

gulp.task('prod:minifyJS', function (done) {
    return gulp.src(paths.distJS+'/application.js')
        //.pipe(minifyJS({mangle: false}))
        .pipe(minifyJS())
        .pipe(gulp.dest(paths.distJS));
});

gulp.task('prod:replaceJS', function () {
    var env = 'prod';
    var configs = JSON.parse(fs.readFileSync(paths.configFiles[env], 'utf8'));

    var patterns = _.map(configs, function (value, key) {
        return {match: key, replacement: value};
    });

    return gulp.src(paths.distJS+'/application.js')
        .pipe(replace({patterns: patterns}))
        .pipe(gulp.dest(paths.distJS));
});

gulp.task('prod:inject', function () {
    var timestamp = new Date().getTime();
    var srcOptions = {read: false};
    var injectOptions = {ignorePath: paths.dist, addRootSlash: false, addSuffix: '?rel=' + timestamp};

    return gulp.src(paths.src.index)
        .pipe(inject(gulp.src(paths.distCSS+'/application.css', srcOptions), injectOptions))
        .pipe(inject(gulp.src(paths.distJS+'/application.js', srcOptions), injectOptions))
        .pipe(gulp.dest(paths.dist));
});

gulp.task('prod:clean', function () {
    var sources = [
        'dist/css/*.css',
        '!dist/css/application.css',
        'dist/js/*.js',
        '!dist/js/application.js'
    ];

    return gulp.src(sources).pipe(vinylPaths(del));
});