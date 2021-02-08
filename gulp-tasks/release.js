const Task = require('../gulp-utils/Task');

module.exports = function(options = {}) {    
    const {config, version} = options;

    const task = new Task({config, version});

    return task.use({
        type: 'release', 
        tasks: [
            'check-release', 
            'assets', 
            'sass', 
            'fonts', 
            'data', 
            'javascript-boot', 
            'javascript-app', 
            'html', 
            'lang', 
            'remove-old-releases'
        ]
    });
};