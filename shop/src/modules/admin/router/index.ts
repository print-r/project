import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import routeList from './router';


Vue.use(VueRouter);

const routes: RouteConfig[] = routeList as RouteConfig[];

// 路由模式
const mode = 'hash';

const router = new VueRouter({
  mode,
  routes,
});

// 路由拦截
router.beforeEach(( to , from , next ) => {
  // 空路由
  if (!to.name) {
    router.go(-1);
    return;
  }
  next();
});


export default router;
