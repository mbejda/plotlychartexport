var page = new WebPage();
var system = require('system');
var args = system.args;
var fs = require('fs');


var props = {};
args.forEach(function(arg, i) {

    var argValue = arg.split('=');

    var arg = argValue[0].replace('--', '');
        var value = argValue[1];
    props[arg]=value;
});

var data = props['data'];
var layout = props['layout'];
var rootPath = props['rootPath'];

if(layout){
    var layout = atob(layout);
}

if(data){
    var data = atob(data);
}else{
    system.stderr.write("Missing plotly plotting data");
    phantom.exit(1);
}

page.onError = function(error) {
    system.stderr.write(error);
    phantom.exit(1);
};



page.open(rootPath+"/phantom/html/index.html", function (status) {




    if(status !== "success"){
        system.stderr.write("Failed to open index.html");
        phantom.exit(1);
        return;

    }

    const jquery = page.injectJs(rootPath+"/phantom/dep/jquery.js");
    const plotly = page.injectJs(rootPath+"/phantom/dep/plotly-1.31.2.js");

    if(!jquery || !plotly){

        system.stderr.write("Failed to load dependencies");
        phantom.exit(1);
    }



                page.viewportSize = {width: 1400, height: 900};

                var clipRect = page.evaluate(function (data,layout) {
                    try {
                        var data = JSON.parse(data);
                    }catch(e){
                        console.error(e);

                    }

                    var plotObject= {
                        data:data.payload
                    };


                    if(layout){
                        try {
                            var wrapper = JSON.parse(layout);
                        }catch(e){
                            console.error(e);
                        }

                        plotObject.layout = wrapper.layout;

                    }



                    Plotly.newPlot('chart', plotObject);


                    return document.querySelector('#chart .svg-container').getBoundingClientRect();

                },data,layout);

                page.clipRect = {
                    top: clipRect.top,
                    left: clipRect.left,
                    width: clipRect.width,
                    height: clipRect.height
                };

               var base64 = page.renderBase64('PNG');
                system.stdout.write(base64);
                phantom.exit();


});