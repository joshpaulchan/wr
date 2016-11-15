"use strict";

module.exports = function(config) {
    config.set({
        basePath: './',
        frameworks: ['jasmine'],
        logLevel: config.LOG_WARN,
        reporters: ['spec'],
        files: [
            'assets/bower_components/angular/angular.js',
            'assets/bower_components/angular-ui-router/release/angular-ui-router.js',
            'assets/bower_components/angular-mocks/angular-mocks.js',
            'app/app.module.js',
            'app/components/*/*.*.js',
            'test/**/*.spec.js'
        ],
        colors: true,
        browsers: [process.env.TRAVIS ? 'Firefox' : 'Chrome'],
        autoWatch: true,
        plugins: ['karma-jasmine', 'karma-chrome-launcher', 'karma-spec-reporter'],
        specReporter: {
            maxLogLines: 5,         // limit number of lines logged per test
            suppressErrorSummary: true,  // do not print error summary
            suppressFailed: false,  // do not print information about failed tests
            suppressPassed: false,  // do not print information about passed tests
            suppressSkipped: true,  // do not print information about skipped tests
            showSpecTiming: false // print the time elapsed for each spec
      },
    });
};
