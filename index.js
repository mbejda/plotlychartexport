const path = require('path');
const phantomjs = require('phantomjs-prebuilt');
const binPath = phantomjs.path;

var phantomPromise = function(plotlyData,layout=false,debug=false) {
    return new Promise((resolve,reject)=> {

        if(!Array.isArray(plotlyData)){
            reject("Data needs to be an Array");
            return;
        }

        let plotlyDataBase64 = new Buffer(JSON.stringify({payload: plotlyData})).toString('base64');
        let dataArg = `--data=${plotlyDataBase64}`;
        let generator = path.join(__dirname + '/phantom', 'generate.js');
        let childArgs = [generator, dataArg];


        if (layout) {
            var plotlyLayoutBase64 = new Buffer(JSON.stringify({layout: layout})).toString('base64');

            var layoutArg = `--layout=${plotlyLayoutBase64}`;
            childArgs.push(layoutArg);
        }

        if (debug) {
            var debugArg = `--debug=true`;
            childArgs.push(debugArg);
        }

        var phantomjsProcess = require('child_process').execFile(binPath, childArgs,function(error, stdout, stderr){

            resolve(stdout);

        });
        phantomjsProcess.stderr.on('data', function (data) {
            reject(data);
            phantomjsProcess.kill('SIGINT');
            return;
        });

    });
};



module.exports.render = phantomPromise;
