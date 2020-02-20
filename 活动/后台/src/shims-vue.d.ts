import Vue from 'vue';
import VueRouter, {Route} from 'vue-router';
import {RouterOptions} from './types/router';
import {LayerdOptions} from './types/layerd';

declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

// 声明全局方法
declare module 'vue/types/vue' {
  interface Vue {
      $router: VueRouter;
      $route: Route;
      $layerd: LayerdOptions;
  }
}

// 路由接口
declare module 'vue-router/types/router' {
  interface VueRouter {
    options: RouterOptions
  }
}

