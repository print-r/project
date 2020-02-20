import Vue from 'vue';
import VueRouter from 'vue-router';

import _import from './_import';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/ExamineList',
  },
  {
    path: '/Login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => _import('Login/index'),
    meta: {
      title: '大尚国际-登录',
      keepAlive: false,
    },
  },
  {
    path: '/ExamineList',
    name: 'ExamineList',
    component: () => _import('ExamineList/index'),
    meta: {
      title: '进行中的活动',
      keepAlive: false,
      isLogin: true,
    },
  },
  {
    path: '/ExamineDetail',
    name: 'ExamineDetail',
    component: () => _import('ExamineDetail/index'),
    meta: {
      title: '大尚国际-审核详情页',
      keepAlive: false,
      isLogin: true,
    },
  },
  {
    path: '/ExaminePage',
    name: 'ExaminePage',
    component: () => _import('ExaminePage/index'),
    meta: {
      title: '大尚国际-审核活动',
      keepAlive: true,
      isLogin: true,
    },
  },
];

// 路由模式
const mode = process.env.NODE_ENV === 'production' ? 'hash' : 'history';

const router = new VueRouter({
  mode,
  routes,
});

router.beforeEach(( to , from , next ) => {
  // 设置标题
  document.title = to.meta.title;
  // 空路由
  if (!to.name) {
    router.go(-1);
    return;
  }
  // 获取用户登录信息
  const userName = sessionStorage.getItem('userName');
  // 路由拦截
  if (to.meta.isLogin && !userName) {
    router.push({
      path: '/Login',
    });
  }
  next();
});

export default router;
