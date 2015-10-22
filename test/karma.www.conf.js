module.exports = function (config) {
    config.set({
        basePath: '../',
        browsers: ['PhantomJS'],
        frameworks: ['jasmine'],
        autoWatch: true,
        files: [
            'www/lib/ionic/js/ionic.bundle.js',
            'www/lib/angular-resource/angular-resource.js',
            'www/lib/angular-mocks/angular-mocks.js',
            'www/lib/ionic-ion-horizontal-scroll-cards/ionic.hscrollcards.js',
            "www/lib/ion-autocomplete/dist/ion-autocomplete.js",
            "www/lib/ionic-ion-autoListDivider.js",
            "www/lib/ion-gallery/dist/ion.gallery.min.js",
            "www/lib/ionic-filter-bar/dist/ionic.filter.bar.js",
            "www/lib/lodash.mobile.js",
            "www/lib/moment/moment.js",
            "www/lib/angular-moment/angular-moment.js",
            "www/lib/ionic.contrib.frostedGlass.js",

            'www/js/**/*.js',
            'test/unit/**/*.spec.js'
        ]
    });
};

//// Karma configuration
//// Generated on Fri Aug 14 2015 16:30:40 GMT+0800 (中国标准时间)
//
//module.exports = function(config) {
//  config.set({
//
//    // base path that will be used to resolve all patterns (eg. files, exclude)
//    basePath: '',
//
//
//    // frameworks to use
//    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
//    frameworks: ['jasmine', 'requirejs'],
//
//
//    // list of files / patterns to load in the browser
//    files: [
//      {pattern: 'test/**/*.spec.js', included: false}
//    ],
//
//
//    // list of files to exclude
//    exclude: [
//    ],
//
//
//    // preprocess matching files before serving them to the browser
//    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
//    preprocessors: {
//    },
//
//
//    // test results reporter to use
//    // possible values: 'dots', 'progress'
//    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
//    reporters: ['progress'],
//
//
//    // web server port
//    port: 9876,
//
//
//    // enable / disable colors in the output (reporters and logs)
//    colors: true,
//
//
//    // level of logging
//    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
//    logLevel: config.LOG_INFO,
//
//
//    // enable / disable watching file and executing tests whenever any file changes
//    autoWatch: true,
//
//
//    // start these browsers
//    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
//    browsers: ['Chrome'],
//
//
//    // Continuous Integration mode
//    // if true, Karma captures browsers, runs the tests and exits
//    singleRun: false
//  })
//}
