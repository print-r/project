import request from '@/utils/request';

// 发布
export const submit = (data: any) => {
    return request({
        method: 'POST',
        url: '/shop_UpdateRenovation.do',
        data,
    });
};

// 预览
export const sendPreview = (data: any) => {
    return request({
        method: 'POST',
        url: '/shop_UpdatePreview.do',
        data,
    });
};