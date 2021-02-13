const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './dist'),
  },
  plugins: [new HTMLWebpackPlugin({ filename: 'index.html', template: 'src/template.html', title: 'Weather App' })],
  module: {
    rules: [
      {
        test: /\.(png|jpeg)$/,
        type: 'asset/resource',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    contentBase: './dist',
  },

  watch: true,
};
