const path = require('path');
const handlebars = require('gulp-compile-handlebars');
const fs = require('fs');
const browserSync = require('browser-sync').get('server');
const helpers = require('./handlebars/helpers');

module.exports = function(gulp, config, version) {
    return function html(done) {
        const src = config.html.src;
        const dest = config.html.dest;

        const handlebarsOptions = {
            helpers: helpers(config),
            batch: [path.resolve(src)]
        };

        function renderHTML(locale, templateData, dest) { //TODO: rename dest

            //Last variables to add
            templateData = Object.assign({}, templateData, config.html.template_data || {});
            templateData.version = version;
            templateData.locale = locale;
            templateData.lang = locale.replace(/^([a-z]{2})-.*/gi, '$1');

            gulp.src(src + '/**/*.html')
                .pipe(handlebars(templateData, handlebarsOptions))
                .on('error', function(e){
                    throw new Error('Error rendering template for locale ' + locale + ': ' + e.message);
                })
                .pipe(gulp.dest(dest));
        }

        function getMaster() {
            return getJson(config.lang.src + '/master.json'); //TODO: retrieve from config
        }

        function getTranslations(master) {
            const files =  fs.readdirSync(config.lang.src);
            let translations = {};
            files.forEach((file) => {
                if (!file.match(/\.json$/gi) || file.match(/master\.json/gi)) return;
                let locale = file.replace('.json', '');
                let jsonData = getJson(config.lang.src + '/' + file);
                translations[locale] = Object.assign({}, master, jsonData);
            });

            return translations;
        }

        function getData() {
            const files =  fs.readdirSync(config.data.src);
            let data = {};
            files.forEach((file) => {
                if (!file.match(/\.json$/gi)) return;
                let name = file.replace('.json', '');
                let jsonData = getJson(config.data.src + '/' + file);
                data[name] = jsonData;
            });

            return data;
        }

        function getJson(path) {
            try {
                return JSON.parse(fs.readFileSync(path));
            } catch (err) {
                return {};
            }
        }

        const master = getMaster();
        const translations = getTranslations(master);
        const data = getData();

        //Render translations
        Object.keys(translations).forEach((locale) => {
            renderHTML(locale, Object.assign({}, translations[locale], {data: data}), dest + '/' + locale);
        });

        //Render the master language
        renderHTML(config.lang.default_locale, Object.assign({}, getMaster(), {data: data}), dest);

        browserSync.reload();
        done();
    };
};
