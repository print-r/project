import request from '@/utils/request';

//个人中心
export const getUserInfoData = (params) => {
    return request({
        method:'GET',
        url:'/openUserVoteList.do',
        params
    })
}


// 生成订单
export const getOrderCode = (params) => {
    return request({
        method:'POST',
        url:'/create_Order.do',
        params
    })
}