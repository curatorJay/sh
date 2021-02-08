module.exports = function(gulp, config, version) {
    return function checkRelease(done) {
        if (!version || !version.toString().match(/^[0-9]+$/gi)) { // Release ID
            throw new Error('Missing version number of incorrect format');
        }
        done();
    };
};
