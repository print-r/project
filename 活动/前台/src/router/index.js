import Vue from 'vue'
import Router from 'vue-router'
import {getUserInfo} from '../utils/common'
const _import = require('./_import_' + process.env.NODE_ENV)
Vue.use(Router)

/**
 * TODO:路由必须填写name属性，并且路由name属性必须与页面name属性一致，否则缓存会失败
 */
const router = new Router({
  mode:process.env.ROUTER_MODE,
  routes: [
    {
      path: '/',
      redirect:'/Activity'
    },
    {
      path: '/Admin',
      redirect:'/Login',
    },
    {
      path: '/Activity', //全部活动
      name:'Activity',
      component: _import('Activity/index'),
      meta:{
        title:'全部活动',
        keepAlive:true, //缓存
      }
    },
    {
      path: '/Personal', //个人中心
      name:'Personal',
      component: _import('Personal/index'),
      meta:{
        title:'个人中心',
        keepAlive:true, //缓存
        isLogin:true
      }
    },
    {
      path: '/ActivityList', //活动列表
      name:'ActivityList',
      component: _import('ActivityList/index'),
      meta:{
        title:'活动',
        keepAlive:true, //缓存
        isLogin:true
      }
    },
    {
      path: '/RankingList', //排行榜
      name:'RankingList',
      component: _import('RankingList/index'),
      meta:{
        title:'排行榜',
        keepAlive:true, //缓存
        isLogin:true
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
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
        return savedPosition
    } else {
        return { x: 0, y: 0 }
    }
  },
})

//路由拦截
router.beforeEach((to, from, next) => {
  //空路由
  if(!to.name)
  {
    router.go(-1);
    return
  }

  try{
    //登录验证
    if(!getUserInfo().mid && to.meta.isLogin)
    {
      let url = process.env.NODE_ENV == 'production' ? process.env.BASE_API : 'http://localhost' + process.env.BASE_API
      window.location.href = url + '/userLogin_index.do'
      return
    }
  }catch(e){}

  let listName = ['ActivityList','RankingList','ActivityIntro']

  let mode = ''
  // 投票、排行榜、活动介绍缓存【清除、添加】
  if((to.name == 'Activity' || to.name == 'Personal' )  && !to.params.isInner)
  {
    mode = 'handleRemove'
  }else
  {
    mode = 'handleAdd'
  }
  //清除缓存
  if(to.params.isCache === false) mode = 'handleRemove'

  listName.forEach( val => {
    router.app.$options.store._mutations[mode][0](val)
  })
  next()
})

export default router
