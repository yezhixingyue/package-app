import { defineConfig } from 'umi';
const IS_PROD = process.env.NODE_ENV ? ["production", "prod"].includes(process.env.NODE_ENV) : false;
// import AntdDayjsWebpackPlugin from 'antd-dayjs-webpack-plugin';
// import dayjs from 'dayjs'
// import 'dayjs/locale/zh-cn'
// dayjs.locale('zh-cn')

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  antd: {},
  history: { type: 'hash' },
  theme: {
    'primary-color': '#428dfa',
    'error-color': '#ff3769',
  },
  proxy: {
    '/Api': {
      target: 'http://192.168.1.92:8055',
      changeOrigin: true, // 开启代理
    },
  },
  targets: {
    ie: 11,
  },
  favicon: '/favicon.ico',
  publicPath: process.env.NODE_ENV === 'development' ? '/' : '/Print/',
  extraBabelPlugins:[
    IS_PROD?'transform-remove-console':"",
  ],
  // chainWebpack(memo, { env, webpack, createCSSRule }) {
  //   //  使用day.js替换moment.js
  //   //TODO: 可能存在问题，后续需要确定下day.js的local-zh文件是否加载进来了
  //   memo.plugin('AntdDayjsWebpackPlugin').use(AntdDayjsWebpackPlugin);
  // },
  // plugins: [],
  // ignoreMomentLocale: true,
  // dynamicImport: {},
});
