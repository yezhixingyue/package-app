import { defineConfig } from 'umi';

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
  favicon: '/favicon.ico',
  publicPath: process.env.NODE_ENV === 'development' ? '/' : '/Print/',
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  // ],
});
