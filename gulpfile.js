const fs = require('fs');
const minimist = require('minimist');

/**
 * Get CLI options
 */
const options = minimist(process.argv.slice(2));
const version = options.buildno || (new Date()).getTime();

/**
 * Load external config file
 */
const task = options._[0];

const rawConfig = Object.assign({}, getConfig('./config.json'), getConfig(`./config.${task}.json`));
const config = JSON.parse(substituteVersionNumber(rawConfig, version));

function substituteVersionNumber(config, version) {
    return JSON.stringify(config).replace(/\[version\]/gi, version);
}

function getConfig(path) {
    try {
        return JSON.parse(fs.readFileSync(path));
    } catch (err) {
        return {};
    }
}

/**
 * Create Tasks
 */
exports['develop'] = require('./gulp-tasks/develop')({config, version});
exports['release'] = require('./gulp-tasks/release')({config, version});
exports['package'] = require('./gulp-tasks/package')({config, version});
exports['optimize-images'] = require('./gulp-tasks/optimize-images')({config, version});