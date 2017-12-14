var exp = require('../');

var trace1 = {
    x: [1, 2, 3, 4],
    y: [10, 15, 13, 17],
    type: 'scatter'
};

var trace2 = {
        x: [1, 2, 3, 4],
        y: [16, 5, 11, 9],
        type: 'scatter'
    };

var layout = {
    title:'Line and Scatter Plot'
};


exp.render([trace1,trace2],layout).then((base)=>{
    console.log(base); /// base64
},(error)=>{
    console.error(error);
})