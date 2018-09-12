# component-platform

一个react组件演示平台

<img src="https://s8.postimg.cc/w0gy0uql1/333.png">

### 背景

内部需要搭建一个业务组件平台，用以展示组件的文档和演示效果。故而借鉴antd用bisheng搭建了这个平台。

### 查看效果

```
npm i

npm run start
```

### 使用方法

git clone 之后，如果对UI交互没额外要求，可以直接往 components目录下丢组件即可。（可以参考test写法）

### 目录介绍

```
├── bin                    // 基于gitlab web hook监听push实时发布的程序
│   ├── index.html         // 发布状态查看页面
│   ├── index.js           // 发布相关node代码
│   └── node-start.json    // 服务器pm2配置
├── build                  // 打包后的目录
├── components             // 组件文档，里面的文件夹可以随意命名（不支持驼峰）下面的三个是为了演示
│   ├── basic
│   ├── mobile
│   └── pc
├── docs                   // 普通文档
│   └── introduce.md
└── site                   // 组件平台相关的代码配置
    ├── bisheng.config.js  // bisheng配置
    ├── order.config.js    // 一二级菜单类型
    └── theme              // 模板、样式等UI相关的文件
```

### 小原理
如果有兴趣了解下这个平台搭建相关的技术和md转化react代码的流程细节，可以查看 https://github.com/tuntuntutu/impressShow

