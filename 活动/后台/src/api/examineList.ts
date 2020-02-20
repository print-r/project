import request from '@/utils/request';
// 审查列表
export const getExamineList = () => {
    return request({
        method: 'POST',
        url: '/find_OngoingActivities.do',
    });
};