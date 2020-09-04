import request from '@/utils/request';

// 获取店铺数据
export const getShop = (data?: any) => {
    return request({
        method: 'POST',
        url: '/getShop_Preview.do',
        data,
    }, true);
};

// 后台店铺
export const getShopAdmin = (data?: any) => {
    return request({
        method: 'POST',
        url: '/getShop_Preview.do',
        data,
    });
};