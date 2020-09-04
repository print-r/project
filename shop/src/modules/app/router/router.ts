import _import from './_import';
const routeList = [
    {
      path: '/',
      redirect: '/mobile',
    },
    {
      path: '/mobile', 
      name: 'Mobile',
      component: () => _import('mobile/index'),
      meta: {
        title: '大尚国际 - 商家店铺 - 移动端',
        keepAlive: true,
      },
    },
    {
      path: '/pc',
      name: 'PC',
      component: () => _import('pc/index'),
      meta: {
        title: '大尚国际 - 商家店铺 - PC端',
        keepAlive: false,
      },
    },
    {
      path: '/cate',
      name: 'Cate',
      component: () => _import('cate/index'),
      meta: {
        title: '大尚国际 - 商家店铺 - 分类',
        keepAlive: true,
      },
    },
    {
      path: '/search',
      name: 'Search',
      component: () => _import('search/index'),
      meta: {
        title: '大尚国际 - 商家店铺 - 搜索商品',
        keepAlive: true,
      },
    },
    {
      path: '/keyword',
      name: 'Keyword',
      component: () => _import('search/keyword'),
      meta: {
        title: '大尚国际 - 商家店铺 - 搜索',
        keepAlive: true,
      },
    },
];
export default routeList;