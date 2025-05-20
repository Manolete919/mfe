const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const commonConfig = require('./webpack.common');

const devConfig = {
  mode: "development",
  output: {
    publicPath: 'http://localhost:9090/',
  },
  devServer: {
    port: 9090,
    historyApiFallback: {
      //index: '/index.html',
      historyApiFallback: true,
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        marketing: 'marketing@http://localhost:9091/remoteEntry.js',
      }
    })
  ]
};

module.exports = merge(commonConfig, devConfig);