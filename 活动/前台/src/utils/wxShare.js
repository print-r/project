import {getAppid} from '../api/wxConfig'

/**
 * 微信分享配置
 */
export const getWxConfig =  () => {
    let params = {
        title : '大尚国际-投票活动', // 分享标题
        desc : '快来参加投票活动吧，可以赢取丰厚的奖品哦！', // 分享描述
        link : window.location.href.split('#')[0], // 分享链接
        imgUrl:require('../../static/images/logo.png'), // 分享图标
    }
    let formData = new FormData();
    // TODO:获取微信签名的url只能用window.location.href
    formData.append('url',params.link)
    getAppid(formData).then( res => {
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: res.data.appid,
            timestamp: res.data.timestamp, // 必填，生成签名的时间戳
            nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
            signature: res.data.signature,// 必填，签名
            jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
            ]// 必填，需要使用的JS接口列表
        });
        wxShare(params)
    })
}

export const wxShare = (params) => {
    wx.ready(function () {
        // 分享给好友
        wx.onMenuShareAppMessage( {
            ...params,
           success : function() {
            //    console.log('用户确认分享后执行的回调函数');
           },cancel : function() {
            //    console.log('用户取消分享后执行的回调函数');
           }
       });
       // 分享朋友圈
       wx.onMenuShareTimeline( {
            ...params,
           success : function() {
            //    console.log('用户确认分享后执行的回调函数');
           },cancel : function() {
            //    console.log('用户取消分享后执行的回调函数');
           }
       });
   })
}