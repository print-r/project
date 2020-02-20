import request from '@/utils/request';

// 获取审核详情
export const getExamineDetail = (data: object) => {
    return request({
        method: 'POST',
        url: '/find_VoteEnrollData.do',
        data,
    });
};


// 获取审核详情
export const submitData = (data: object) => {
    return request({
        method: 'POST',
        url: '/activityVote_updateAuditState.do',
        data,
    });
};