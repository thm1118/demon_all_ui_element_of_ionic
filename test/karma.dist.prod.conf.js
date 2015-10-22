module.exports = function (config) {
    config.set({
        basePath: '../',
        browsers: ['PhantomJS'],
        frameworks: ['jasmine'],
        autoWatch: true,
        files: [
            'www/lib/angular-mocks/angular-mocks.js',
            'dist/js/**/*.js',
            'test/unit/**/*.spec.js'
        ]
    });
};