import request from '@/utils/request';

// 登录
export const handleSign = (data: object) => {
    return request({
        method: 'POST',
        url: '/login_valiDate_mall.do',
        data,
    });
};
