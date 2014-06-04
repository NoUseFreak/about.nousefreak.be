// preprocessing.js

var _ = require('lodash');

module.exports = function (grunt, config, paths) {

    config['less'] = {
        app: {
            options: {
                compress: false
            },
            files: [{
                expand: true,
                cwd: paths['app_less'],
                src: ['*.less'],
                dest: paths['web_css'],
                ext: '.css'
            }]
        }
    };

    config['watch'] = _.extend({}, config['watch'], {
        less: {
            files: [paths['app_less'] + '**/*.less'],
            tasks: ['less:app']
        }
    });

};
