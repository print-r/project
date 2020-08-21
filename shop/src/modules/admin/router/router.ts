import _import from './_import';
const routeList = [
  {
    path: '/',
    redirect: '/mobile',
  },
  {
    path: '/main',
    name: 'Main',
    component: () => _import('main/index'),
    meta: {
      title: '大尚国际 - 移动端店铺装修',
      keepAlive: false,
    },
    children: [
      {
        path: '/mobile',
        name: 'mobile',
        component: () => _import('mobile/index'),
        meta: {
          title: '大尚国际 - 移动端店铺装修',
        },
      },
      {
        path: '/pc',
        name: 'pc',
        component: () => _import('pc/index'),
        meta: {
          title: '大尚国际 - PC端店铺装修',
        },
      },
    ],
  },
  {
    path: '/preview',
    name: 'Preview',
    component: () => _import('preview/index'),
    meta: {
      title: '大尚国际 - PC端店铺预览',
      keepAlive: false,
    },
  },
];
export default routeList;