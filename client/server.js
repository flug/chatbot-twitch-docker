const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const path = require('path');
const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);
const HTML_FILE = path.join(__dirname, 'index.html')
// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
}));

app.get('*', (req, res) => {
    res.sendFile(HTML_FILE)
})


// Serve the files on port 3000.
app.listen(80, function () {
    console.log('Example app listening on port 80!\n');
});
