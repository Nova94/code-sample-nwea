var webpack = require('webpack');

module.exports = {
    entry: ['whatwg-fetch','./src/main.jsx'],
    output: { path: __dirname + '/dist/', filename: 'bundle.js'},
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            }
        ]
    }
};