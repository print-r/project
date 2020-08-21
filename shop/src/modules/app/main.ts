import Vue from 'vue';
import Router from 'vue-router';
import App from './App.vue';
import router from './router';
import store from './store';
// import validate from '../../utils/validate';
import menu from '@/components/render';
import Component from 'vue-class-component';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueCropper from 'vue-cropper';
import animated from 'animate.css';
import VueLazyLoad from 'vue-lazyload';
import { deep, debounce, getUrlParams } from '@/utils/common';
import VueWechatTitle from 'vue-wechat-title'; 


Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate',
]);

Vue.use(menu);
Vue.use(VueAwesomeSwiper);
Vue.use(ElementUI);
Vue.use(VueCropper);
Vue.use(animated);
Vue.use(VueLazyLoad);
Vue.use(VueWechatTitle);


// 注入验证规则对象
// Vue.prototype.$validate = validate;
// 深拷贝
Vue.prototype.$deep = deep;
// 防抖
Vue.prototype.$debounce = debounce;
// 获取浏览器参数
Vue.prototype.$getUrlParams = getUrlParams;

Vue.config.productionTip = false;

// TODO:解决打包后浏览器路由无法跳转
const routerPush: any = Router.prototype.push;
Router.prototype.push = function push(location: any) {
  return routerPush.call(this, location).catch( (error: any) => error);
};

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
