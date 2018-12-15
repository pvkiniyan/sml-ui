const path = require('path');
const combineLoaders = require('webpack-combine-loaders');
const BUILD_DIR = path.resolve(__dirname, 'dist');

module.exports = {
    entry: ['whatwg-fetch', './src/index.js'],
    output: {
      filename: 'bundle.js',
      path: BUILD_DIR,
    },
    module: {
        rules: [{
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['eslint-loader'],
        },
        {
          test: /\.css$/,
          use: [ 'style-loader', 'css-loader' ]
        },
        {
          test: /\.scss$/,
          use: [ 'style-loader', 'css-loader', 'sass-loader' ]
        },
        {
          test: /\.(png|jpg|gif|jpeg|svg)$/,
          use: [{
            loader: 'file-loader', 
            options: {
              name: '[hash:8].[ext]',
              outputPath: 'assets/',
              publicPath: '/assets/',
            }
          }],
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react'],
            "env": {
              "production": {
                "presets": ["minify"]
              }
            },
            plugins: ['styled-jsx/babel',
              ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }],
              'transform-class-properties', 
              'transform-object-rest-spread', 
              'transform-async-to-generator', 
              'lodash',
              "transform-object-assign",
              "transform-proto-to-assign"
            ],
          },
        }],
      },
};
  