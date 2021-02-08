const fs = require('fs');
const mkdirp = require('mkdirp');
const browserSync = require('browser-sync').get('server');
const logSymbols = require('log-symbols');

module.exports = function(gulp, config, version) {
    return function lang(done) {
        const src = config.lang.src;
        const dest = config.lang.dest;

        let didWriteFiles = false;

        //Load in master language file!
        let masterContents = getJson(src + '/master.json');

        //Create templatedata object and add version variable
        let baseTemplateData = Object.assign({}, masterContents, {version: version});

        //Look for other locales files, loop through them and export json file for each
        let array = fs.readdirSync(src);
        array.forEach(function(item) {
            if (!item.match(/\.json$/gi) || item.match(/master\.json/gi)) return;
            let locale = item.replace('.json', '');
            let localeContents = getJson(src + '/' + item);

            //Merge locale contents with master file, so it falls back
            let templateData = Object.assign({}, baseTemplateData, localeContents);

            writeFile(locale, dest, templateData);
        });

        function createDir(path) {
            // create path if not existing
            mkdirp.sync(path, function(err) {
                if (err) {
                    throw new Error('Coulnd\'t create folder: ' + path);
                }
                else {}
            });
        }

        function writeFile(locale, dest, templateData) {
            didWriteFiles = true;

            createDir(dest + '/');

            // remove line breaks (added by PO-editor)
            fs.writeFile(dest + '/' + locale + '.json', JSON.stringify(templateData).replace(/\\n/g, ''), function(e) {
                // done
            });
        }

        function getJson(path) {
            try {
                return JSON.parse(fs.readFileSync(path));
            } catch (err) {
                return {};
            }
        }

        if (didWriteFiles) {
            console.log(logSymbols.success, 'Lang files succesfully written');
        }

        browserSync.reload();
        done();
    };
};