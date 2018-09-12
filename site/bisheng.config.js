const path = require('path');
const webpack = require('webpack');
const CSSSplitWebpackPlugin = require('css-split-webpack-plugin').default;

const isDev = process.env.ENV === 'development';
const orderConfig = require('./order.config');

function alertBabelConfig(rules) {
  rules.forEach((rule) => {
    if (rule.loader && rule.loader === 'babel-loader') {
      rule.options.plugins = rule.options.plugins.filter(plugin => (
        !plugin.indexOf
        || plugin.indexOf('babel-plugin-add-module-exports') === -1
      ));
    } else if (rule.use) {
      alertBabelConfig(rule.use);
    }
  });
}

module.exports = {
  port: 8003,
  output: '../',
  source: {
    components: './components',
    docs: './docs',
  },
  theme: './site/theme',
  htmlTemplate: './site/theme/static/template.html',
  themeConfig: orderConfig,
  filePathMapper(filePath) {
    if (filePath === '/index.html') {
      return ['/index.html', '/index-cn.html'];
    }
    if (filePath.endsWith('/index.html')) {
      return [filePath, filePath.replace(/\/index\.html$/, '-cn/index.html')];
    }
    if (filePath !== '/404.html' && filePath !== '/index-cn.html') {
      return [filePath, filePath.replace(/\.html$/, '-cn.html')];
    }
    return filePath;
  },
  webpackConfig(config) {
    config.resolve.alias = {
      site: path.join(process.cwd(), 'site'),
      'react-router': 'react-router/umd/ReactRouter',
    };

    config.externals = {
      'react-router-dom': 'ReactRouterDOM',
    };

    if (isDev) {
      config.devtool = 'source-map';
    }

    alertBabelConfig(config.module.rules);

    config.plugins.push(new CSSSplitWebpackPlugin({ size: 4000 }));
    config.plugins.push(new webpack.DefinePlugin({
      ENV: JSON.stringify('production'),
    }));

    return config;
  },
  htmlTemplateExtraData: {
    isDev,
  },
};
