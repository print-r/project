import Vue from 'vue';
import VueRouter, { Route } from 'vue-router';
import { RouterOptions } from './types/router';
// import { LayerdOptions } from './types/layerd';
import { ValidateOptions } from './types/validate';

// 声明全局方法
declare module 'vue/types/vue' {
  interface Vue {
    $router: VueRouter;
    $route: Route;
    $validate: ValidateOptions;
    $deep: any;
    $debounce: (fn: () => void, delay?: number) => () => void;
    $getUrlParams: (name: string | string[]) => string | object;
  }
}

// 路由接口
declare module 'vue-router/types/router' {
  interface VueRouter {
    options: RouterOptions
  }
}


