import request from '@/utils/request';

//活动数据、活动搜索（共用）
export const getActiveProduct = (params) => {
    return request({
        method:'GET',
        url:'/openActivityPrize.do',
        params
    })
}