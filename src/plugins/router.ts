import * as NProgress from 'nprogress';
import { createRouter, createWebHistory } from 'vue-router';
import routes from '../routes';
import '../style/nprogress.scss';

const router = createRouter({
  routes,
  history: createWebHistory(),
});

NProgress.configure({ showSpinner: false });

router.beforeEach(() => {
  NProgress.start();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
