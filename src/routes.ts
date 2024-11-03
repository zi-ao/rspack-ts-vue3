import type { RouteLocationRaw } from 'vue-router';

const routes: RouteLocationRaw = [
  {
    path: '/',
    component: () => import('./pages/index.vue'),
  },
];

export default routes;
