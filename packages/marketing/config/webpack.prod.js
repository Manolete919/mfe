const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require("../package.json");
// We need to define this ENV Variable
const prodConfig = {
  mode: "production",
  output: {
    // template for file names
    // contenthash is used for cashing
    filename: '[name].[contenthash].js'
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      filename: "remoteEntry.js",
      exposes: {
        './MarketingApp': './src/bootstrap'
      },
      shared: packageJson.dependencies
    })
  ]


};
module.exports = merge(commonConfig, prodConfig);