const path = require('path');

module.exports = {
    entry: './wonderoliejs/main.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    }
};