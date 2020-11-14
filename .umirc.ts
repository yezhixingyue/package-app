import { defineConfig } from 'umi';
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);

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
    IS_PROD?'transform-remove-console':""
  ],
});
