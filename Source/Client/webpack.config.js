const path = require('path');

module.exports = {
  entry: './source/app.ts',
  mode: 'development',
  output: {
    filename: 'vendor.js',
    path: path.resolve(__dirname, '../Server/source/webroot/scripts'),
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.m?ts$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            rootMode: "upward",
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'file-loader',
        options: {
            name: 'assets/[name].[ext]',
            outputPath: '../images'
        }
      },
    ]
  },
}; 