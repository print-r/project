import router from '../router'
import {handleCheckWeiXin} from '../utils/common';

const state = {
    keepAlive:[], // 缓存组件
    color:'', //主题色
    tabbarList:
    [
        {
            data:
            [
                {
                    icon:'icon-toupiaohuodong-quanbuhuodong',
                    url:'Activity',
                    name:'全部活动'
                },
                {
                    icon:'icon-toupiaohuodong-gerenzhongxin',
                    url:'Personal',
                    name:'个人中心'
                }
            ],
        },
        {
            data:
            [
                {
                    icon:'icon-toupiaohuodong-toupiao',
                    url:'ActivityList',
                    name:'投票'
                },
                {
                    icon:'icon-toupiaohuodong-paihangbang',
                    url:'RankingList',
                    name:'排行榜'
                },
                {
                    icon:'icon-toupiaohuodong-huodongxiangqing',
                    url:'ActivityIntro',
                    name:'活动介绍'
                },
                {
                    icon:'icon-toupiaohuodong-quanbuhuodong',
                    url:'Activity',
                    name:'全部活动',
                    isInner:true
                },
                {
                    icon:'icon-toupiaohuodong-gerenzhongxin',
                    url:'Personal',
                    name:'个人中心',
                    isInner:true
                }
            ],
        }
    ],
    previewOptions:{ //图片预览插件配置
        fullscreenEl:false, //关闭全屏按钮
        loop:false, // 关闭无缝预览
    },
    weChat:handleCheckWeiXin(), // 判断是否为微信浏览器
}

//保存缓存组件名称
router.options.routes.forEach( val => {
    if(val.meta && val.meta.keepAlive)
    {
        state.keepAlive.push(val.name)
    }
});

export default state