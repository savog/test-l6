/**
 * Created by savo on 22.2.16..
 */

module.exports = function (config) {
    config.set({
        basePath: 'app',

        frameworks: ['jasmine', 'jasmine-matchers', 'jspm'],

        files: [
            '../node_modules/babel-polyfill/dist/polyfill.js'
        ],

        preprocessors: {
            '!(lib)/**/*.js': ['babel'],
            '!(lib)/**/!(*.spec).js': ['coverage']
        },

        babelPreprocessor: {
            options: {
                sourceMap: 'inline'
            }
        },

        jspm: {
            config: 'jspm-config.js',
            packages: 'lib/',
            loadFiles: ['app.js', '$resources/**/*.spec.js', 'components/**/*.spec.js', 'utils/**/*.spec.js'],
            serveFiles: ['**/*.+(js|html|css)'],
            stripExtension: true
        },

        proxies: {
            '/app/': '/base/',
            '/lib/': '/base/lib/'
        },

        // reporters: ['dots', 'coverage', 'verbose', 'html'],
        reporters: ['dots', 'coverage', 'verbose', 'junit'],

        coverageReporter: {
            dir: '../reports/coverage/',
            reporters: [
                {
                    type: 'html'
                }, {
                    type: 'json'
                }, {
                    type: 'lcov'
                }, {
                    type: 'text-summary'
                }, {
                    type: 'lcovonly',
                    subdir: '.',
                    file: 'lcov.info'
                }
            ],
            check: {
                global: {
                    statements: 75,
                    lines: 75,
                    functions: 75,
                    branches: 60
                }
            }
        },

        junitReporter: {
            outputDir: '../reports/junit/',
            outputFile: 'test-results.xml',
            useBrowserName: false
        },

        browsers: ['PhantomJS'],
        // browsers: ['Chrome'],
        singleRun: false,
        browserNoActivityTimeout: 75000
    });
};
