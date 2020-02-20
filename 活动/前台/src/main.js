// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import {getUserInfo} from './utils/common'
import 'lib-flexible/flexible'
import 'animate.css'

//图片预览
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
Vue.use(preview,store.state.previewOptions)

//layer
import layer from 'vue2-layer-mobile'
Vue.use(layer)

//标题
import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueWechatTitle)

//地区组件
import { Picker } from 'mint-ui';
Vue.component(Picker.name, Picker);

//注册全局方法(获取用户信息)
Vue.prototype.$getUserInfo = getUserInfo

Vue.config.productionTip = false

/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
