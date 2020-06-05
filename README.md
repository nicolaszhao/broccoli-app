# broccoli-app

## 起步

### 安装项目依赖

```
npm install
```

### 执行可用的 NPM SCRIPTS

#### `npm start`

启动一个用于开发环境的服务，在浏览器中打开 [http://localhost:3003/](http://localhost:3003/)

#### `npm test`

运行单元测试

#### `npm run build`

构建/打包代码为生产环境用的静态资源

### 自定义配置

查看 [@hammal/cli-service 配置参考](https://github.com/nicolaszhao/hammal/blob/master/packages/cli-service/README.md)

## 功能调校

### Babel

`.babelrc`:

```diff
{
  "presets": [
    "@hammal/babel-preset-app"
  ],
+ "plugins": [...]
}
```

### ESLint

`.eslintrc`:

```diff
{
  "extends": "nicolaz-base",
  "parser": "babel-eslint",
+ "rules": { ... }
}
```

### Browserslist

`package.json`:

```diff
{
  ...
  "browserslist": [
+   ...
  ]
}
```

### CSS Reset

`./src/assets/base.scss`:

```diff
- @import "sanitize.css";
+ @import "normalize.css";
```

### Native Fetch API

1、更换 `@totebox/ajax` 为 `@totebox/http`:

```
npm uninstall @totebox/ajax
npm i @totebox/http
```

2、在 `./src/index.js` 的最顶部:

```diff
+ import 'whatwg-fetch';
```

3、`./src/api/index.js`:

```diff
- import Ajax from '@totebox/ajax';
+ import Ajax from '@totebox/http';
```

4、根据 [@totebox/http](https://github.com/nicolaszhao/totebox/tree/master/packages/http) 文档调整全局请求配置

### 环境变量

你可以创建 `.env`、`.env.local`、`.env.[environment]`，或 `.env.[environment].local` 文件来添加环境变量。参考文档： [hammal-cli-service - 环境变量](https://github.com/nicolaszhao/hammal/tree/master/packages/cli-service#%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F) 和 [vue-cli 的环境变量和模式](https://cli.vuejs.org/zh/guide/mode-and-env.html#%E6%A8%A1%E5%BC%8F)

## `./src` 目录规范

```
./src
├── api
├── assets
├── components
├── utils
├── constants
├── configs
├── pages
└── index.js
```

### api

后端接口请求模块

### assets

全局资源：图片、样式等

### components

通用组件

### utils

通用工具函数等

### constants

通用常量

### configs

全局配置

### pages

页面模块，或路由组件

### `index.js`

入口文件，`polyfill` 和 全局样式等在此处导入
