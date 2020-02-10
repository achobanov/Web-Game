const path = require('path');

module.exports = {
  entry: './app.ts',
  mode: 'production',
  output: {
    filename: 'vendor.js',
    path: path.resolve(__dirname, '../Server/source/webroot/scripts'),
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.m?ts$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'file-loader',
        options: {
            name: 'assets/[name].[ext]',
            outputPath: '../'
        }
      },
    ]
  },
}; 