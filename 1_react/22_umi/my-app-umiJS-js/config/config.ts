import { defineConfig } from 'umi';

export default defineConfig({
  // layout: 'sidemenu',
  routes: [
    // { path: '/', component: '@/pages/index' },
    { path: '/', component: '@/layouts/BasicLayout' },
  ],
});
