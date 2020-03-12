<template>
    <div class="act_list" :class="{join:!isJoin}">
        <top :title="title"/>
        <div class="bg">
            <img :src="activityImg" alt="">
            <!-- 查看奖品 -->
            <div class="lookProduct" @click="handleJumpUrl"></div>
            <!-- 查看活动介绍 -->
            <router-link :to="{name:'ActivityIntro',params:{active:1}}" class="lookIntro" replace></router-link>
        </div>
        <div class="end_time" :style="`background-color:${color}`">
            <div v-if="!isOver" class="time" >
                <i class="iconfont icon-taskmanagement"></i>
                <span>距离{{isStart ? '结束' : '开始'}}时间还有：<span class="dateTime"> <i class="d">-</i> 天 <i class="h">-</i> 时 <i class="m">-</i> 分 <i class="s">-</i> 秒</span></span>
            </div>
            <div v-if="isOver">
                <span >活动已结束</span>
            </div>
            <!-- 小圆球 -->
            <div class="cir_l">
                <i :style="`background-color:${color}`"></i>
                <i :style="`background-color:${color}`"></i>
            </div>
            <div class="cir_r">
                <i :style="`background-color:${color}`"></i>
                <i :style="`background-color:${color}`"></i>
            </div>
        </div>
        <div class="section">
            <!-- 搜索框 -->
            <div class="search">
                <div class="input" :style="`border:2px solid ${color};`">
                    <input id="search" type="search" placeholder="请输入编号或者名称" @keydown.enter="handleSearch" :style="`color:${color};`">
                </div>
                <div class="btn" @click="handleSearch" :style="`background-color:${color}`">搜索</div>
            </div>
            <!-- 投票列表 -->
            <ul class="list" v-show="list.length">
                <li v-for="(val,key) in list" :key="key" :style="`background-color:${key == bannerSlot ? '#fff' : color};width:${key == bannerSlot ? '100%' : ''};padding:${key == bannerSlot ? 0 : ''}`">
                    <div v-if="key == bannerSlot">
                        <a href="http://www.dusun.com.cn/discountIndex.do" target="_blank">
                            <img src="../../../static/images/zp1.png" alt="">
                        </a>
                    </div>
                    <router-link v-if="key != bannerSlot" :to="{path:'/ActivityDetail',query:{activity_id:id,id:val.enroll_id}}">
                        <div class="img">
                            <img :src="val.portrait" alt="">
                            <div class="tips" :style="`background-color:${color}`">{{val.enroll_id}}号</div>
                        </div>
                        <div class="desc">
                            <div class="name">{{val.attribute1}}</div>
                            <div class="praise_count">已获{{val.gain_votes}}赞</div>
                            <div class="vote">{{isOver ? '活动已结束' : '投TA一票' }}</div>
                        </div>
                    </router-link>
                </li>
            </ul>
            <!-- 空数据 -->
            <div class="not_data" v-show="!list.length">
                <img src="../../../static/images/action.jpg">
                <div>获取不到相关数据</div>
            </div>
            <!-- banner -->
            <banner v-if="list.length < bannerSlot" />
        </div>
        <!-- 需要购买商品才可参加活动弹框 -->
        <joinPopup :joinPopup.sync="joinPopup" :product_id="product_id" />
        <!-- 用户活动信息 -->
        <match-info :isJoin="isJoin" :sign="sign" :joinPopup.sync="joinPopup" />
        <!-- 活动结束弹窗 -->
        <overPopup :isOver.sync="isOpen"/>
        <!-- 底部导航 -->
        <tabbar :list="$store.state.tabbarList[1]" />
    </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import tabbar from '@/components/Index/tabbar.vue';
import banner from '@/components/banner/index.vue'
import top from '@/components/Index/header.vue';
import {countDown} from '@/utils/common'
import matchInfo from '@/components/matchInfo/index.vue'
import overPopup from '@/components/overPopup/index.vue'
import joinPopup from '@/components/joinPopup/index.vue'
import {getActivityListData} from '@/api/activity'
export default {
    name:'ActivityList',
    components:{
        matchInfo,
        overPopup,
        tabbar,
        top,
        banner,
        joinPopup
    },
    beforeRouteEnter(to,from,next)
    {
        next( vm => {
            if(vm.keepAlive.indexOf(vm.$options.name) == -1) vm.handleAdd(vm.$options.name) 
        })
    },
    data(){
        return{
            title:'',
            id:'', // 活动ID
            activityImg:'', //活动图
            list:[], // 数据
            keyWord:'', //保存搜索框数据
            dateEl:{}, // 倒计时元素
            isOver:false, //活动状态
            isOpen:false, //弹窗
            isJoin:true, //用户是否参与
            isStart:false, //判断活动是否开始
            productUrl:'', //商品地址
            bannerSlot:10, // 商品楼层广告插入
            isBuy:sessionStorage.getItem('isBuy'), // 后台需要的参数
            product_id:0, // 商品ID
            sign:'', // 活动参与状态
            joinPopup:false, // 参赛弹窗
            joinPopupAnimate:true,
        }
    },
    methods:{
        ...mapMutations({
            handleAdd:'handleAdd',
        }),
        //获取投票列表数据
        handleGetData()
        {
            // 活动参与状态
            let is_buy_first = this.$route.params.isBuy || this.isBuy
            //获取数据
            getActivityListData({
                mapStr:JSON.stringify({
                    activity_id:this.id,
                    mid:this.$getUserInfo().mid,
                    is_buy_first
                })
            }).then( res => {
                //标题
                this.title = res.data.ListVoteIndex[0].activity_title
                //保存标题（分享需要用到）
                sessionStorage.setItem('a_title',this.title);
                //设置标题
                document.title = this.title
                //保存活动参与状态
                this.sign = res.data.sign
                // 商品id
                this.product_id = res.data.getMapRegularPro.product_id
                //商品地址
                this.productUrl = res.data.ListVoteIndex[0].prize_url
                //判断是否参与
                this.isJoin = Boolean(~~res.data.sign)
                // 判断商品规则(可参与)
                if(res.data.sign == '4') this.isJoin = false
                //活动列表
                this.list = res.data.ListVoteDetailed
                //海报图
                this.activityImg = res.data.ListVoteIndex[0].activity_img
                /* 解决ios时间乱码兼容 */
                res.data.ListVoteIndex[0].start_time = res.data.ListVoteIndex[0].start_time.replace(/\-/g, "/")
                res.data.ListVoteIndex[0].end_time = res.data.ListVoteIndex[0].end_time.replace(/\-/g, "/")
                //开始时间
                let start_time = new Date(res.data.ListVoteIndex[0].start_time).getTime()
                //结束时间
                let end_time = new Date(res.data.ListVoteIndex[0].end_time).getTime()
                //当前时间
                let now = Date.now()
                //活动开始
                if(now > start_time)
                {
                    //判断活动是否结束
                    if(now > end_time)
                    {
                        this.isJoin = true
                        //活动结束
                        this.isOver = true
                        //弹窗
                        this.isOpen = true
                        
                    }else
                    {
                        //活动开始
                        this.isStart = true
                        //活动进行中
                        this.handleCountDown(res.data.ListVoteIndex[0].end_time)
                    }
                }else
                {
                    //隐藏参与
                    this.isJoin = true
                    //未开始
                    this.handleCountDown(res.data.ListVoteIndex[0].start_time,res.data.ListVoteIndex[0].end_time,Boolean(~~res.data.sign))
                }
            })
        },
        //设置时间
        handleSetTime(time)
        {
            let dateTime = countDown(time)
            this.dateEl.d.innerText = dateTime.days
            this.dateEl.h.innerText = dateTime.hours
            this.dateEl.m.innerText = dateTime.minutes
            this.dateEl.s.innerText = dateTime.seconds
        },
        //倒计时
        handleCountDown(time,end_time,isJoin)
        {
            this.handleSetTime(time)

            let timer = setInterval(() => {
                if(Date.now() >= new Date(time).getTime())
                {
                    if(this.isStart)
                    {
                        clearInterval(timer)
                        //活动结束
                        this.isOver = true
                        //弹出提示框
                        this.isOpen = true
                    }else
                    {
                        //活动开始
                        this.isStart = true
                        //结束时间
                        time = end_time
                        //显示参与状态
                        this.isJoin = isJoin
                    }
                }
                this.handleSetTime(time)
            },1000)
        },
        //搜索
        handleSearch(e)
        {
            //搜索内容
            let attribute1 = (e.target.value || document.querySelector('#search').value).replace(/(^\s*)|(\s*$)/g, "")
            if(attribute1 != this.keyWord)
            {
                //保存搜索框内容
                this.keyWord = attribute1;
                getActivityListData({
                    mapStr:JSON.stringify({
                        activity_id:this.id,
                        attribute1
                    })
                }).then( res => {
                    //空数据
                    if(!res.data.ListVoteDetailed.length)
                    {
                        this.list = []

                        return
                    }
                    this.list = res.data.ListVoteDetailed
                })
            }
        },
        handleJumpUrl()
        {
            let productId = this.productUrl.match(/\d+/)
            
            if(productId)
            {
                //商品详情
                location.href = process.env.NODE_ENV == 'production' ? `${process.env.BASE_API}/ds-${productId[0]}.html` : `http://localhost${process.env.BASE_API}/ds-${productId[0]}.html`
            }else
            {
                //跳转奖品介绍
                this.$router.replace({
                    name:'ActivityIntro',
                    params:{
                        active:0
                    }
                })
            }
        },
    },
    mounted(){
        // 保存活动参与规则
        if(this.$route.params.isBuy) sessionStorage.setItem('isBuy',this.$route.params.isBuy)
        //保存活动列表id（防止页面刷新参数丢失）
        if(this.$route.params.id) sessionStorage.setItem('activityId',this.$route.params.id)
        this.id = this.$route.params.id || sessionStorage.getItem('activityId')
        //获取数据
        this.handleGetData()
        // 获取元素
        this.dateEl = {
            d:document.querySelector('.d'),
            h:document.querySelector('.h'),
            m:document.querySelector('.m'),
            s:document.querySelector('.s')
        }
    },
    computed:{
        ...mapState([
        'keepAlive',
        'color'
        ])
    }
}
</script>

<style lang="scss" scoped>
    @import './css/style.scss';
</style>
