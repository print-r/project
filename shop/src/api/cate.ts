import request from '@/utils/request';

export const getShopClass = (data?: any) => {
    return request({
        method: 'POST',
        url: '/shop_class.do',
        data,
    }, true);
};