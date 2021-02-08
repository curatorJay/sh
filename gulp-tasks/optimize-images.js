const Task = require('../gulp-utils/Task');

module.exports = function(options = {}) {    
    const {config, version} = options;

    const task = new Task({config, version});

    return task.use({
        type: 'optimize-images', 
        tasks: [
            'optimize-images',
        ]
    });
}