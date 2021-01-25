const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = () => {
  return {
    mode: 'production',
    entry: {
      index: './src/index.js'
    },
    devtool: 'source-map',
    plugins: [
      new Dotenv({
        path: './.production.env'
      }),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/template.html',
        title: 'Produksjon'
      }),
      new CopyPlugin({
        patterns: [
          {from: './other', noErrorOnMissing: true}
        ],
      })
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'build'),
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              plugins: ['@babel/plugin-transform-runtime']
            }
          }
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        }
      ],
    },
    resolve: {
      extensions: ['*', '.js', '.jsx']
    }
  };
};