// const { defaultHandlers } = require('react-docgen');
// const dnHandler = require('react-docgen-displayname-handler');
const path = require('path');
const routers = require('./router.config');

module.exports = {
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.less$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'less-loader',
              options: {
                javascriptEnabled: true,
              },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif|webp)$/,
          use: [
            'url-loader?limit=4096&name=assets/images/[hash:8].[name].[ext]',
          ],
        },
      ],
    },
    resolve: {
      alias: {
      },
    },
  },
  serverPort: 6060,
  styleguideDir: path.join(__dirname, 'build'),
  pagePerSection: true,
  // getComponentMetadataPath(filepath) {
  //   const extname = path.extname(filepath);
  //   return `${filepath.substring(0, filepath.length - extname.length)}.json`;
  // },
  styleguideComponents: {
    StyleGuideRenderer: path.join(__dirname, 'src/styleguide/grid'), // 整体布局
    // TableOfContentsRenderer: path.join(__dirname, 'src/styleguide/menu'), // 左侧菜单导航
    SectionRenderer: path.join(__dirname, 'src/styleguide/section'), // md布局模块
    PlaygroundRenderer: path.join(__dirname, 'src/styleguide/playground'), // 组件实例演示
  },
  title: '积木库',
  exampleMode: 'expand',
  sections: routers,
  theme: {
    color: {
      base: '#494949',
      link: '#53ba1a',
      linkHover: '#50b01a',
      sidebarBackground: '#eaeaea',
    },
    // sidebarWidth: 300,
    spaceFactor: 6,
  },
  updateExample(props) {
    const { lang, settings } = props;
    if (!settings) {
      props.settings = {};
    }

    if (!lang) { // 将代码展示块的缺省语言类型改为js
      props.lang = 'js';
      props.settings.static = true;
    }
    if (lang === 'js' || lang === 'javascript') {
      props.lang = 'js';
      props.settings.static = true;
    }
    return props;
  },
};
