//活动详情
import request from '@/utils/request';

export const getRankList = (params) => {
    return request({
        method:'GET',
        url:'/openRankingList.do',
        params
    })
}