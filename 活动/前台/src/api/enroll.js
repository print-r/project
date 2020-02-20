import request from '@/utils/request';

//获取属性
export const getEnrollData = (params) => {
    return request({
        method:'GET',
        url:'/openVoteAddDetailed.do',
        params
    })
}

//图片上传
export const handleUploadFile = (data) => {
    return request({
        method:'POST',
        url:'/onFile_fileVoteEnroll.do',
        data
    },true)
}

//获取地区
export const getProvince = (params) => {
    return request({
        method:'GET',
        url:'/address_getProvince_wx.do',
        params
    })
}

//报名参加
export const handleJoinActivity = (data) => {
    return request({
        method:'POST',
        url:'/addActivityVoteDetailed.do',
        data
    })
}