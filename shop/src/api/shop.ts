import request from '@/utils/request';

// 获取店铺数据
export const getShop = (data?: any) => {
    return request({
        method: 'POST',
        url: '/getShop_Preview.do',
        data,
    }, true);
};