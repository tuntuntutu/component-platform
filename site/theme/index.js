require('core-js/es6/string');


const path = require('path');

const homeTpl = './template/Home/index';
const webContentTpl = './template/Content/index';

function pickerGenerator(module) {
  const tester = new RegExp(`^docs/${module}`);
  return (markdownData) => {
    const { filename } = markdownData.meta;
    if (tester.test(filename)
        && !/\/demo$/.test(path.dirname(filename))) {
      return {
        meta: markdownData.meta,
      };
    }
  };
}

module.exports = {
  lazyLoad(nodePath, nodeValue) {
    if (typeof nodeValue === 'string') {
      return true;
    }
    return nodePath.endsWith('/demo');
  },
  pick: {
    webComponents(markdownData) {
      const { filename } = markdownData.meta;

      if (!/^components/.test(filename)
          || /[/\\]demo$/.test(path.dirname(filename))) return; // 如果不是web组件 或者 是demo文件夹下的md，则直接返回

      return {
        meta: markdownData.meta,
      };
    },
    'docs': pickerGenerator(''),
  },
  plugins: [
    'bisheng-plugin-description',
    'bisheng-plugin-toc?maxDepth=2&keepElem',
    'bisheng-plugin-react?lang=__react',
  ],
  routes: {
    path: '/',
    component: './template/Layout/index',
    indexRoute: { component: homeTpl },
    childRoutes: [{
      path: 'index',
      component: homeTpl,
    }, {
      path: 'index-cn',
      component: homeTpl,
    }, {
      path: 'docs/:children',
      component: webContentTpl,
    }, {
      path: 'docs/:children',
      component: webContentTpl,
    },   {
      path: 'components/:category/:children',
      component: webContentTpl,
    }],
  },
};

