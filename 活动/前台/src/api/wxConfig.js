import request from '@/utils/request';
// 获取微信分享配置参数
export const getAppid = (params) => {
    return request({
        method:'POST',
        url:'/getH5share.do',
        params
    },true)
}