const gulp = require('gulp');
const fs = require('fs');
const path = require('path');

module.exports = class Task {

    constructor(options = {}) {
        this._config = options.config;
        this._version = options.version;
    }

    use(options) {
        var tasks = [];
        for (var i = 0, len = options.tasks.length; i < len; i++) {
            const path = this.taskToPath(options.type, options.tasks[i]);
            tasks.push(require(path)(gulp, this._config, this._version));
        }
    
        if (options.callback) tasks.push(options.callback);
        return gulp.series(...tasks);
    }
    
    watch(path, array) {
        const tasks = [];
        for (var i=0, len=array.length; i<len; i++) {
            tasks.push(require(this.taskToPath('develop', array[i]))(gulp, this._config, this._version));
        }
        gulp.watch(path, gulp.series(...tasks));
    }
    
    taskToPath(type, task) {
        var paths = [path.resolve('gulp-tasks', type, task),  path.resolve('gulp-tasks', 'shared', task)];
        paths = paths.filter(function(value) {
            return fs.existsSync([value, '.js'].join(''));
        });
        return paths[0];
    }
};