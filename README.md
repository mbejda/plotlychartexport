![](https://www.mbejda.com/content/images/2017/12/Copy-of-oh-javascript--4-.png)
# Plot.ly Chart Export
*PlotlyChartExport* uses Phantom.js to render plot.ly charts on the server. It crops the chart, base64 encodes it and returns the encoded chart in a resolving promise.
It does not rely on the filesystem nor does it rely on graphics libraries like `Cairo` making it an effective chart rendering solution for serverless environments.



- Only 1 Dependency
- Works in Serverless Environments
- Size < 10MB


### Installation
```
npm install plotlychartexport --save
```

### Usage
```javascript
/// include library
const exp = require('plotlychartexport');

/// define plot.ly data properties
let trace1 = {
    x: [1, 2, 3, 4],
    y: [10, 15, 13, 17],
    type: 'scatter'
};
let trace2 = {
    x: [1, 2, 3, 4],
    y: [16, 5, 11, 9],
    type: 'scatter'
};

/// define plot.ly layout
let layout = {
    title: 'Line and Scatter Plot'
};

/// run render command
exp.render([trace1, trace2], layout).then((base) => {
    console.log(base); /// base64
}, (error) => {
    console.error(error);
})

```

If you are experiencing any issues with this module open up a ticket and send me a tweet.
[@notMiloBejda](https://twitter.com/notMiloBejda)