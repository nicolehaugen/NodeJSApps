module.exports = function(grunt) {
    grunt.initConfig({
        env: {
            dev: {
                NODE_ENV: 'development'
            },
            test: {
                NODE_ENV: 'test'
            }
        },
        nodemon: {
            dev: {
                script: 'bin/www.js',
                options: {
                    ext: 'js,html',
                    watch: ['app.js', 'config/**/*.js', 'app/**/*.js']
                }
            }
        },
        mochaTest: {
            src: 'tests/**/*.js',
            options: {
                reporter: 'spec'
            }
        },
        jshint: {
            all: {
                src: ['app.js', 'config/**/*.js', 'app/**/*.js', 'public/js/*.js', 'public/modules/**/*.js']
            }
        },
        csslint: {
            all: {
                src: 'public/modules/**/*.css'
            }
        },
        watch: {
            js: {
                files: ['app.js', 'config/**/*.js', 'app/**/*.js', 'public/js/*.js', 'public/modules/**/*.js'],
                tasks: ['jshint']
            },
            css: {
                files: 'public/modules/**/*.css',
                tasks: ['csslint']
            }
        },
        concurrent: {
            dev: {
                tasks: ['nodemon', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');

    //grunt.registerTask('default', ['env:dev']);
    grunt.registerTask('default', ['env:dev', 'lint', 'concurrent']);
    grunt.registerTask('test', ['env:test', 'mochaTest']);
    grunt.registerTask('lint', ['jshint', 'csslint']);
};