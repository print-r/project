import request from '@/utils/request';

// 审核页面
export const getExaminePage = (data: object) => {
    return request({
        method: 'POST',
        url: '/find_VoteEnroll.do',
        data,
    });
};