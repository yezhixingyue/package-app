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
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  // ],
});
