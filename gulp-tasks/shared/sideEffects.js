const fs = require('fs');

module.exports = function(gulp, config) {
    return function sideEffects(done) {
        let counter = 0;
        const sideEffects = config.js.sideEffects;

        if (sideEffects.length < 1) {
            done();
            return;
        }

        run();

        function run() {
            const item = sideEffects[counter];
            const json = getJson(item.file);
            if (json) {
                json.sideEffects = item.options;
                fs.writeFile(item.file, JSON.stringify(json, null, 2), function(err) {
                    if (err) { return console.log(err); }
                    console.log(`${item.file} was overwritten with sideEffects`);
                    
                    counter++;
                    checkReady();
                });
            }
            else {
                console.log(`${item.file} was not overwritten with sideEffects`);

                counter++;
                checkReady();
            }
        }

        function checkReady() {
            if (counter === sideEffects.length) {
                done();
            }
            else {
                run();
            }
        }

        function getJson(path) {
            try {
                return JSON.parse(fs.readFileSync(path));
            } catch (err) {
                return false;
            }
        }
    };
};