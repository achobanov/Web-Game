const path = require('path');

module.exports = {
  entry: './app.js',
  output: {
    filename: 'vendor.js',
    path: path.resolve(__dirname, '../Server/webroot/'),
  },
};