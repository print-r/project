import request from '@/utils/request';

export const getProductData = (data?: any) => {
    return request({
        method: 'POST',
        url: '/getShopProduct.do',
        data,
    }, true);
};