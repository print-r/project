import Vue from 'vue';
import Router from 'vue-router';
import App from './App.vue';
import router from './router';
import store from './store';
import layerd from './utils/layerd/js';
import 'lib-flexible';
import 'animate.css';

import Component from 'vue-class-component';
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate',
]);

// 自定义弹出层
Vue.prototype.$layerd = layerd;

Vue.config.productionTip = false;

// TODO:解决打包后浏览器路由无法跳转
const routerPush: any = Router.prototype.push;
Router.prototype.push = function push(location: any) {
  return routerPush.call(this, location).catch( (error: any) => error);
};

export default new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
