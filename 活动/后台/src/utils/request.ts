import axios from 'axios';
import QS from 'qs';
import _this from '../main';

/**
 * TODO:axios 请求配置，根据后台规则所有请求必须是POST请求，否则会请求失败
 */

// 基准路径
const baseURL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_API : ''; 

// 创建axios实例
const HTTP = axios.create({
  baseURL, 
  timeout: 30000, // 请求超时时间
});

// POST请求头
HTTP.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 请求拦截器
// axios.interceptors.request.use(function (config) {
//   config.headers['X-Requested-With'] = 'XMLHttpRequest'
//   // 在发送请求之前做些什么
//   return config;
// }, function (error) {
//   // 对请求错误做些什么
//   return Promise.reject(error);
// });

// 响应拦截器
HTTP.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: any) => {
    // 关闭加载框
    _this.$layerd.handleClose();
    _this.$router.push({
      path: '/Login',
    });
  },
);

const request = (params: any , file: boolean = false) => {
  return new Promise((resolve, reject) => {
    const load = params.data && params.data.loading;
    // loading
    if (load !== false) {
      _this.$layerd.handleToast();
    } else {
      // 删除参数
      delete params.data.loading;
    }
    // 用户名
    const userName = params.url !== '/login_valiDate_mall.do' ? {zh_zhm: sessionStorage.getItem('userName')} : {};
    // 参数
    const data = params.data ? JSON.parse(params.data.mapStr) : {};
    // 每次发送请求携带用户账号
    if (params.url !== '/login_valiDate_mall.do') {
      params.data = {mapStr: JSON.stringify({
        ...data,
        ...userName,
      })};
    }
    // 项目路径
    params.url = process.env.VUE_APP_PRODUCT_NAME + params.url;
    
    // POST序列化数据
    if (!file) {
      params.data = QS.stringify(params.data);
    }
    HTTP(params)
    .then((res) => {
      // 关闭加载框
      _this.$layerd.handleClose();
      // 登录过期
      if (typeof res.data !== 'object' && res.data.indexOf('正在跳转') !== -1) {
        // 清除session
        sessionStorage.setItem('userName', '');
        _this.$router.push({
          path: '/Login',
        });
        return;
      }
      resolve(res);
    })
    .catch((err) => {
       // 请求失败
      reject(err);
      // 关闭加载框
      _this.$layerd.handleClose();
      // 确认框
      _this.$layerd.handleConfirm({
        content: '请求失败，请刷新重试',
      } , () => {
        // 刷新页面
        _this.$router.go(0);
      });
    });
  });
};

export default request;
