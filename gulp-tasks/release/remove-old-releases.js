var fs = require('fs');
var path = require('path');
var del = require('del');

module.exports = function (gulp, config) {
    return function removeOldReleases(done) {
        var folders = getFolders(config.static).sort();
        if (folders.length > config['keep-releases']) {
            var range = folders.length - config['keep-releases'];
            var oldReleases = [];
            for (var i = 0; i < range; i++) {
                oldReleases.push(config.static + '/' + folders[i] + '/');
            }
            del.sync(oldReleases, {force: true});
        }
        done();
    };
};

function getFolders(dir) {
    if (fs.existsSync(dir)) {
        return fs.readdirSync(dir)
            .filter(function (file) {
                return fs.statSync(path.join(dir, file)).isDirectory();
            });
    } else {
        return [];
    }
}
