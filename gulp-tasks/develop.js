const path = require('path');
const logSymbols = require('log-symbols');

const Task = require('../gulp-utils/Task');

module.exports = function(options = {}) {    
    const {config, version} = options;

    const task = new Task({config, version});

    return task.use({
        type: 'develop', 
        tasks: [
            'serve', 
            'assets', 
            'sass', 
            'fonts', 
            'data', 
            'javascript-boot', 
            'javascript-app', 
            'html', 
            'lang',
            'reload'
        ], 
        callback: function watchTasks() {
            task.watch(path.join(config.assets.src, '/**/*'), ['assets']);
            task.watch(path.join(config.sass.src, '/**/*.{sass,scss,css}'), ['sass']);
            task.watch(path.join(config.fonts.src, '/**/*'), ['fonts']);
            task.watch(path.join(config.data.src, '**/*.{json,xml}'), ['data']);
            task.watch(path.join(config.html.src, '**/*.{html,hbs}'), ['html']);
            task.watch(path.join(config.lang.src, '**/*.json'), ['html', 'lang']);
            
            task.watch(path.join(config.js.dest), ['reload']);

            console.log(logSymbols.info, 'Watching... (CTRL+C to end)');
        }
    });
}