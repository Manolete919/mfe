const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require("../package.json");
// We need to define this ENV Variable
const domain = process.env.PRODUCTION_DOMAIN;
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
      remotes: {
        marketing: `marketing@http://${domain}/marketing/remoteEntry.js`,
      },
      shared: packageJson.dependencies
    })
  ]


};
module.exports = merge(commonConfig, prodConfig);