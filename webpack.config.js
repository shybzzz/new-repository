var path = require('path');
var config = {
    entry: path.resolve(__dirname, 'js/entry.js'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/, // A regexp to test the require path. accepts either js or jsx
            loader: 'babel?cacheDirectory', // The module to load. "babel" is short for "babel-loader"
            exclude: /node_modules/
        }]
    }
};

module.exports = config;