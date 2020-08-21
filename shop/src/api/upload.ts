import request from '@/utils/request';

export const upload = (data: any) => {
    return request({
        method: 'postForm',
        url: '/fileUploadShopImg.do',
        data,
    });
};