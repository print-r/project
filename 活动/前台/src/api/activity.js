import request from '@/utils/request';

//活动数据、活动搜索（共用）
export const getActivityData = (params) => {
    return request({
        method:'GET',
        url:'/activityVoteIndex.do',
        params
    })
}

//活动列表
export const getActivityListData = (params) => {
    return request({
        method:'GET',
        url:'/activityVoteDetailed.do',
        params
    })
}

//活动详情
export const getActivityDetailData = (params) => {
    return request({
        method:'GET',
        url:'/activityMemberDetailed.do',
        params
    })
}

//活动投票
export const handleActionVote = (data) => {
    return request({
        method:'POST',
        url:'/addActivityVoteLog.do',
        data
    })
}
