import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  antd: {},
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
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  // ],
});
