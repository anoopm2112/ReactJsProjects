/* eslint-disable no-undef */
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const Common = require('./webpack.common');
const { getFavIcon } = require('./src/utils/WebpackUtils');
const { PROJECT: { CFW: SELECTED_PROJECT }, MODE: { TEST } } = require('./src/configs/project');

module.exports = merge(Common, {
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      filename: 'index.html',
      template: './public/index.html',
      title: 'Child and Family Welfare [Test]',
      favicon: path.resolve(getFavIcon(SELECTED_PROJECT)),
      meta: {
        author: 'Child and Family Welfare',
        ChildAndFamilyWelfare: 'Child and Family Welfare Web Site'
      }
    }),
    new webpack.DefinePlugin({
      ENV_MODE: JSON.stringify({ PROJECT: SELECTED_PROJECT, MODE: TEST })
    })
  ]
});
