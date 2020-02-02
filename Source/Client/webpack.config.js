const path = require('path');

module.exports = {
  entry: './app.js',
  mode: 'development',
  output: {
    filename: 'vendor.js',
    path: path.resolve(__dirname, '../Server/webroot/'),
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      } 
    ]
  },
}; 