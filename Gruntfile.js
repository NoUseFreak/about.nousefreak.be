// Gruntfile.js

var _ = require('lodash'),
    fs = require('fs'),
    path = require('path'),
    timeGrunt = require('time-grunt');

var paths = {
    'app': 'app/',
    'app_less': 'app/less/',
    'web_css': 'web/css/',
    'app_js': 'app/js',
    'web_js': 'web/js'
};

module.exports = function (grunt, config) {
    'use strict';

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times.
    if (typeof timeGrunt === 'function') {
        timeGrunt(grunt);
    }

    // Configurations
    config = {
        pkg: grunt.file.readJSON('package.json'),
        env: process.env['APP_ENV'] || 'dev'
    };

    var configDir = './grunt';
    fs.readdirSync(configDir).forEach(function (file) {
        var filePath = path.resolve(configDir, file);

        if (!fs.statSync(filePath).isDirectory()) {
            require(filePath)(grunt, config, paths);
        }
    });

    // Initialize
    grunt.initConfig(config);

//    grunt.loadNpmTasks('grunt-contrib-requirejs');

    // Register tasks
    grunt.registerTask('default', [
        'less:app',
        'watch'
    ]);

};

