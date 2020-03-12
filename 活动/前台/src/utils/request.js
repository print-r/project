import axios from 'axios'
import QS from 'qs'
import _this from '../main.js';

// 创建axios实例
let HTTP = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? process.env.BASE_API : '', // 基准路径
  timeout: 15000// 请求超时时间
})

//POST请求头
HTTP.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 请求拦截器
// HTTP.interceptors.request.use()

// 响应拦截器
HTTP.interceptors.response.use(
  response => {
    let res = response.data
    //设置主题色
    if(res['ListVoteIndex'] || res['activity_color'] || res['mapRankingTime'] || res['mapDetailed'])
    {
      let color = res['activity_color'] || (res['mapRankingTime'] && res['mapRankingTime'].activity_color)  || (res['ListVoteIndex'] && res['ListVoteIndex'][0].activity_color) || (res['mapDetailed'] && res['mapDetailed'].activity_color)
      //保存主题色
      _this.$store._mutations.handleSetColor[0](color)
    }
    return response
  },
  error => {
    _this.$layer.alert('获取数据失败');
  }
);

const request = (params,file = false) => {
  if(params.url.indexOf('getH5share.do') != -1)
  {
    // 微信分享接口需要用formData请求（数据处理）
    params.data = params.params
    delete params.params
  }else
  {
    //loading
    _this.$layer.open({type:2,content:'加载中'});
  }
  return new Promise((resolve, reject) =>{
    //项目路径
    params.url = process.env.BASE_API + params.url
    //POST序列化数据
    if(!file) params.data = QS.stringify(params.data)
    
    HTTP(params)
    .then((res) => {
      _this.$layer.closeAll()
      resolve(res);
    })
    .catch((err) => {
      reject(err)
       //请求失败
      _this.$layer.closeAll()
      _this.$layer.alert('数据获取失败')
    })
  });
} 


export default request


