const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src') + '/index.js',
    mode: 'development',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    watch: true,
    devServer: {
        contentBase: './',
        host: '0.0.0.0',
        port: 80,
        http2: true

    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['css-loader'],
            },
        ],
    },

};
