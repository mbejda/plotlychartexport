var plotlyChartExport = require('../');

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




describe("Testing Plotly Chart Module", function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

    it("Testing Chart", function(done) {
        plotlyChartExport.render([trace1,trace2],layout).then((base)=>{

          expect(typeof base).toBe("string");

            done();
        },(error)=>{
            console.error(error);
        })


    });
});
