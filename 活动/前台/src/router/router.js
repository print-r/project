export default  [
    {
        path: '/',
        redirect:'/Activity'
    },
    {
        path: '/Activity', //全部活动
        name:'Activity',
        component: _import('Activity/index'),
        meta:{
        title:'全部活动',
        keepAlive:true, //缓存
        isLogin:false,
        isShare:true
        }
    },
    {
        path: '/Personal', //个人中心
        name:'Personal',
        component: _import('Personal/index'),
        meta:{
        title:'个人中心',
        keepAlive:true, //缓存
        isLogin:true,
        isShare:true
        }
    },
    {
        path: '/ActivityList', //活动列表
        name:'ActivityList',
        component: _import('ActivityList/index'),
        meta:{
        title:'活动',
        keepAlive:true, //缓存
        isLogin:true,
        isShare:true
        }
    },
    {
        path: '/RankingList', //排行榜
        name:'RankingList',
        component: _import('RankingList/index'),
        meta:{
        title:'排行榜',
        keepAlive:true, //缓存
        isLogin:true,
        isShare:true
        }
    },
    {
        path: '/ActivityIntro', //活动介绍
        name:'ActivityIntro',
        component: _import('ActivityIntro/index'),
        meta:{
        title:'活动介绍',
        keepAlive:true, //缓存
        isLogin:true
        }
    },
    {
        path: '/ActivityDetail', //活动详情
        name:'ActivityDetail',
        component: _import('ActivityDetail/index'),
        meta:{
        title:'详情',
        keepAlive:true, //缓存
        isLogin:true
        }
    },
    {
        path: '/Enroll', //报名填写页面
        name:'Enroll',
        component: _import('Enroll/index'),
        meta:{
        title:'报名信息填写',
        keepAlive:false, //不缓存
        isLogin:true
        }
    },
    {
        path: '/Cropper', //图片裁剪
        name:'Cropper',
        component: _import('Cropper/index'),
        meta:{
        title:'裁剪',
        keepAlive:false, //不缓存
        isLogin:true
        }
    },
    {
        path: '/SuccessEnroll', //报名成功
        name:'SuccessEnroll',
        component: _import('SuccessEnroll/index'),
        meta:{
        title:'报名成功',
        keepAlive:false, //不缓存
        isLogin:true
        }
    }
]