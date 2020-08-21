import axios from 'axios';
import QS from 'qs';

type RequestType = 'post' | 'get' | 'postForm' | 'POST' | 'GET';

interface RequestOptions {
  method: RequestType;
  url: string;
  data?: any;
  params?: any;
}

/**
 * TODO:axios 请求配置，根据后台规则所有请求必须是POST请求，否则会请求失败
 */

// 基准路径
// const baseURL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_API : ''; 

// 创建axios实例
const HTTP = axios.create({
  // baseURL,
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
    
  },
);

const request = (params: RequestOptions, index = false): Promise<Request> => {
  return new Promise((resolve, reject) => {
    let projectName = '';
    if (process.env.NODE_ENV === 'development' || process.env.VUE_APP_LOCAL_TEST === 'true') {
      projectName = process.env[index ? 'VUE_APP_PROJECT'  : 'VUE_APP_ADMIN_PROJECT'] as string;
    }
    // 项目路径
    params.url = projectName + params.url;
    // POST序列化数据
    if (params.method.toLowerCase() === 'post') {
      params.data = QS.stringify(params.data);
    }
    // formData数据格式
    if (params.method === 'postForm') {
      let formData = new FormData();
      Object.keys(params.data).map((name: string) => {
        formData.append(name, params.data[name]);
      });
      params.data = formData;
      params.method = 'POST';
    }
    (HTTP as any)(params)
    .then((res: any) => {
      resolve(res);
    })
    .catch((err: any) => {
      // 请求失败
      reject(err);
    });
  });
};

export default request;
