<template>
    <div class="layout">
        <top :isGoBack="$route.params.isInner || false" />
        <div class="content">
             <!-- 顶部 -->
            <div class="top">
                <!-- 用户信息 -->
                <div class="info" @click="handleJumpUserInfo">
                    <div class="avatar">
                        <img :src="$getUserInfo().mid ? $getUserInfo().img || 'http://www.dusun.com.cn/form/myDuSun/util/images/user_face_03.jpg' : require('../../../static/images/login.png')" alt="">
                    </div>
                    <span class="username">{{$getUserInfo().mn || '您还未登录'}}</span>
                </div>
                <!-- 收货地址 -->
                <div class="address" >
                    <div @click="handleJumpAddress" :style="$route.params.isInner === true ? `background-color:${color}` : '' ">收货地址</div>
                </div>  
            </div>
            <div class="tab">
                <!-- 参加活动信息 -->
                <div class="item" @click="handleChange(0)" :class="{active:!active}">
                    已参加活动
                </div>
                <!-- 中奖信息 -->
                <div class="item" @click="handleChange(1)"  :class="{active:active}">
                    中奖记录
                </div>
                <i class="line" :style="`${$route.params.isInner === true ? `border-bottom:2px solid ${color}` : ''};transform:translateX(${speed})`"></i>
            </div>
            <!-- 活动信息 -->
            <ul class="list_info" v-show="!active">
                <li  v-for="(val,key) in list[active]" :key="key" >
                    <div class="row" @click="handleJump(val)">
                         <div class="left">
                            <div class="name">
                                {{val.activity_title}}<span class="tips" :class="val.className">{{val.tips}}</span>
                            </div>
                            <div class="rank" v-if="val.state != 2 || val.isOver">
                                <div class="rank_info">
                                    <span>排名：<em>{{val.state ? val.rank : '-'}}</em> </span>
                                    <span>票数：<em>{{val.state ? val.gain_votes : '-'}}</em></span>
                                </div>
                            </div>
                            <div class="end_time" v-if="val.state != 2 || val.isOver">
                                结束时间：{{val.end_time}}
                            </div>
                            <div class="reject_text" v-if="val.state == 2 && !val.isOver">
                                {{val.pass_log}}{{val.isOver}}
                            </div>
                        </div>
                        <div class="right">
                            <div class="iconfont icon">                                 
                               <span v-if="val.state == 2 && !val.isOver">重新提交</span> <i class="icon-you1"></i>                                  
                            </div>
                        </div>
                   </div>
                   <div class="order" v-if="val.createOrder">
                        <!-- 已结束 + 可以优惠下单 + 优惠下单 -->
                        <div v-if=" !val.createOrder && val.pay_state == '1'">
                            <div class="advance_order"  v-if="val.mapRegularSign == '1'">
                                <div class="line-bg"></div>
                                <div style="display: flex;justify-content: space-between;font-size: 12px;color:#666;align-items: center;">
                                    <img :src="imgUrl" style="width:28.39px;height:36px;">
                                    <div class="text">您已获得“活动优惠价提前购买”资格</div>
                                    <div class="top_btn" style="margin-top: 0;?android:attr/borderlessButtonStyle;" @click="checkOrder">优惠下单</div>                     
                                </div>
                            </div>
                        </div>

                        <!-- 进行中 + 可以优惠下单 + 优惠下单-->
                        <!--  && val.pay_state == '1' -->
                        <div v-if="val.createOrder && val.state == 1">
                            <div class="advance_order"  v-if="val.mapRegularSign == '1'">
                                <div class="line-bg"></div>
                                <div style="display: flex;justify-content: space-between;font-size: 12px;color:#666;align-items: center;">
                                    <img :src="imgUrl" style="width:28.39px;height:36px;">
                                    <div class="text">您已获得“活动优惠价提前购买”资格</div>                                                             
                                        <!-- 未付款 -->
                                        <div v-if="val.pay_state == '0'">
                                            <!-- 没有生成订单 -->
                                            <div v-if="!val.order_code">                                                    
                                                <div v-if="val.mapRegular.stock >= val.mapRegular.product_num" @click="orderCodeBtn(val)">
                                                    <div class="top_btn" style="margin-top: 0;border:none;">优惠下单</div>
                                                </div>
                                                <div v-if="val.mapRegular.stock <  val.mapRegular.product_num">
                                                    <div class="top_btn" style="margin-top: 0;opacity: 0.5;">库存不足</div>
                                                </div>                                           
                                            </div>  
                                              <!-- 已生成订单 -->
                                            <div v-if="val.order_code" @click="checkOrder">
                                                <div class="top_btn" style="margin-top: 0;border:none;" >优惠下单</div>
                                            </div>                                            
                                        </div>
                                        <!-- 已付款 -->
                                        <div v-if="val.pay_state == '1'">                                               
                                        <button class="top_btn" style="margin-top: 0;opacity: 0.5;border:none;" @click="checkOrderAll">查看订单</button> 
                                        </div>                                                                                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <!-- 中奖信息 -->
             <ul class="list_info" v-show="active">
                <li v-for="(val,key) in list[active]" :key="key" @click="checkOrder">
                    <div class="name">
                        {{val.activity_title}}<span class="tips zj">已中奖</span>
                    </div>
                    <div class="rank">
                        <div class="rank_info color_6">
                            <span>{{val.winning_note}}</span>
                        </div>
                        <div class="iconfont icon">
                            <span>去付款</span><i class="icon-you1"></i>
                        </div>
                    </div>
                    <div class="end_time">
                        点击立即付款即可生成订单
                    </div>
                </li>
            </ul>
            <div class="not_tips" v-if="list[active] && list[active].length <= 0">
                <img :src="tipsImg[active]" alt="">
                <div class="text">
                    <span>{{$getUserInfo().mid ? active == 0 ? '您还没有参加活动~' : '您还没有中奖' : '您还未登录'}}</span>
                    <router-link v-if="$getUserInfo().mid" :style="`color:${$route.params.isInner ? color : ''}`" :to="{path:'/Activity'}">去逛逛</router-link>
                    <a @click="handleJumpUserInfo" :style="`color:${$route.params.isInner ? color : ''}`" v-if="!$getUserInfo().mid">去登录</a>
                </div>
            </div>
        </div>
        <!-- 底部导航 -->
        <tabbar :list="tabbarList[$route.params.isInner ? 1 : 0]" />
    </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import {getUserInfoData,getOrderCode} from '@/api/personal';
import tabbar from '@/components/Index/tabbar.vue';
import top from '@/components/Index/header.vue';
import cache from '@/utils/cache'
import {handleJumpUrl} from '@/utils/common'
export default {
    name:'Personal',
    components:{
        tabbar,
        top
    },
    beforeRouteEnter(to,from,next){
        next( vm => {
            if(from.name == 'SuccessEnroll')
            {
                vm.handleChange('0')
            }
            cache(vm)
        })
    },
    data(){
        return{
            active:0,// 0活动数据，1中奖数据
            list:[],
            tipsImg:[require('../../../static/images/not_activity.jpg'),require('../../../static/images/not_prize.jpg')],
            speed:0,
            imgUrl:'//www.dusun.com.cn/form_mobile/myDuSun/index/images/1.png'
        }
    },
    methods:{
        ...mapMutations({
            handleAdd:'handleAdd',
            handleRemove:'handleRemove'
        }),
        //切换选项
        handleChange(status)
        {
            if(this.active === status) return

            this.active = ~~status

            let lis = document.querySelector('.tab').children

            let items = []

            for(let item of lis)
            {
                if(item.className.indexOf('item') != -1)
                {
                    items.push(item)
                }
            }

            let site = items[this.active].offsetLeft + (items[this.active].clientWidth  / 2) - (document.querySelector('.line').clientWidth / 2)

            this.speed = site + 'px'
        
        },
        //获取数据
        handleGetData()
        {
            getUserInfoData({
                mapStr:JSON.stringify({
                    mid:this.$getUserInfo().mid
                })
            }).then( res => {
               for(let name in res.data)
               {
                   if(name == 'sizeNum') continue;
                   if(name == 'ListUserVoteList')
                   {
                       res.data[name].forEach( val => {
                            var dateVal = Date.now() > new Date(val.end_time.replace(/\-/g, "/")).getTime();     
                            if(dateVal)   //false                                   
                            {
                                val.className = 'js'
                                val.tips = '已结束'     
                                val.isOver = true                                  
                            }else
                            {
                               //状态
                                switch(val.state)
                                {
                                    case 0:
                                        val.className = 'sh'
                                        val.tips = '审核中'
                                    break;
                                    case 1:                
                                        val.className = 'jx'
                                        val.tips = '进行中'
                                        val.createOrder = true;
                                    break;
                                    case 2:
                                        val.className = 'wg'
                                        val.tips = '审核未通过'
                                    break;
                                }
                            }
                           
                       });
                   }
                   this.list.unshift(res.data[name])
               }
            })
        },
        /**
         * 路由跳转
         * @param item [object] 数据对象
         */
        handleJump(item)
        {
           if(item.state == 2 && !item.isOver)
           {
               //审核未通过
               this.$router.push({
                   path:'/Enroll',
                   query:{
                       activity_id:item.id,
                       id:item.enroll_id
                    }
               })
           }else
           {
               let mode = this.$route.params.isInner ? 'replace' : 'push'
               let param = this.$route.params.isInner ? {isGoBack:true} : {}
               this.$router[mode]({
                   path:'/ActivityDetail',
                   query:{
                       activity_id:item.id,
                       id:item.enroll_id,
                       ...param
                    }
               })
           }
        },
        // 跳转个人信息
        handleJumpUserInfo()
        {
            if(this.$getUserInfo().mid)
            {
                // 已登录
                handleJumpUrl('userinfo');
            }else
            {
                // 未登录
                handleJumpUrl('login');
            }
        },
        // 收货地址跳转
        handleJumpAddress()
        {
            window.location.href = process.env.NODE_ENV == 'production' ? process.env.BASE_API + '/address_mobileIndex.do' : 'http://localhost' + process.env.BASE_API + '/address_mobileIndex.do'
        },

        checkOrder(){
             window.location.href = process.env.NODE_ENV == 'production' ? process.env.BASE_API + '/order_index.do?url=form_mobile/myDuSun/order/index.jsp&handle_status=0' : 'http://localhost' + process.env.BASE_API + '/order_index.do?url=form_mobile/myDuSun/order/index.jsp&handle_status=0'
             
        },
        checkOrderAll(){
            window.location.href = process.env.NODE_ENV == 'production' ? process.env.BASE_API + '/order_index.do?url=form_mobile/myDuSun/order/index.jsp&handle_status=all' : 'http://localhost' + process.env.BASE_API + '/order_index.do?url=form_mobile/myDuSun/order/index.jsp&handle_status=all'
        },
        
        // // 生成订单
        orderCodeBtn(item){
             getOrderCode({
                  mapStr:JSON.stringify({
                    mid:this.$getUserInfo().mid,
                    activity_id:item.id
                })
             }).then(res => {
                if(res.data.info == '下单成功'){
                    window.location.href = process.env.NODE_ENV == 'production' ? process.env.BASE_API + '/order_index.do?url=form_mobile/myDuSun/order/index.jsp&handle_status=0' : 'http://localhost' + process.env.BASE_API + '/order_index.do?url=form_mobile/myDuSun/order/index.jsp&handle_status=0'
                }else{
                   console.log('库存不足');
                }
             })
        },
              
    },

    mounted(){
        this.handleChange('0')
        this.handleGetData()
    },
    computed:{
        ...mapState([
        'tabbarList',
        'color'
        ])
    }

}
</script>
<style lang="scss" scoped>
    @import './css/style.scss';
</style>