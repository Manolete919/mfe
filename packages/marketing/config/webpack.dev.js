const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const commonConfig = require('./webpack.common');

const devConfig = {
  mode: "development",
  output: {
    publicPath: 'http://localhost:9091/',
  },
  devServer: {
    port: 9091,
    historyApiFallback: {
      //index: '/index.html',
      historyApiFallback: true,
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "marketing",
      filename: "remoteEntry.js",
      exposes: {
        './MarketingApp': './src/bootstrap'
      }
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
  ]
};

module.exports = merge(commonConfig, devConfig);