<template>
    <div class="layout-2" v-if="isShow">
        <top :title="title" />
        <div class="section">
            <!-- 列表图 -->
            <div class="list_img">
                <img preview :src="list.portrait" alt="">
            </div>
            <!-- 信息 -->
            <div class="info">
                <div class="name_rank">
                    <div class="name">{{list.attr1}}</div>
                    <div class="rank">第{{list.rank || ' - '}}名</div>
                </div>
                <div class="variety">
                    <div class="left">
                        <div class="variety_name">{{list.attribute2}}：{{list.attr2}}</div>
                        <div class="sex">{{list.attribute3}}：{{list.attr3}}</div>
                    </div>
                    <div class="variety_btn" :style="`background-color:${$store.state.color}`" :class="{disabled:list.status.voteStatus}" @click="handleVote" v-if="mid != list.mid && list.status">
                        {{list.status.voteText || '投TA一票'}}
                    </div>
                </div>
                <div class="foot">
                    <div>{{list.attribute4}}：{{list.attr4}}</div>
                    <div class="tic_count">已有{{list.gain_votes}}人为TA投票</div>
                </div>
            </div>
            <!-- 描述 -->
            <div class="desc">
                {{list.attr5}}
            </div>
            <!-- 详情 -->
            <div class="detail">
                <img v-for="(val,key) in list.imgs" :key="key" preview :src="val">
            </div>
            <banner />
        </div>
         <!-- 参与 -->
        <div class="join wxShare">
            <router-link v-if="!isOver && status != 0 && mid == list.mid" :to="{'path':'/ActivityList'}" replace class="iconfont icon-toupiaohuodong-toupiao" :style="`background-color:${$store.state.color}`"><span>投票</span></router-link>
            <div v-if="list.status" class="text" :class="{disabled:list.status.disabled}" @click="handleJoin" :style="`background-color:${$store.state.color}`">
                {{list.status.text}}
            </div>
            <router-link v-if="!isOver && status != 0 && mid == list.mid" :to="{'path':'/Personal'}" replace class="iconfont icon-toupiaohuodong-gerenzhongxin" :style="`background-color:${$store.state.color}`"><span>我的</span></router-link>
        </div>
        <!-- 投票成功弹窗 -->
        <!-- <popup :isOpen="voteSuccess" /> -->
        <div class="popup" v-if="voteSuccess" :class="voteAnimate ? 'zoomIn' : 'zoomOut'">
            <div class="icon" @click="handleClosePopup">
                <i class="iconfont icon-toupiaohuodong-shanchu"></i>
            </div>
            <div class="img">
                <img src="../../../static/images/vot_success.png" alt="">
            </div>
            <div class="title_text">感谢您！投票成功</div>
            <div class="text">了解活动，参与投票得大奖</div>
            <router-link class="btn" replace :to="{path:'/ActivityList',query:{id:$route.query.activity_id,isBuy:$route.query.isBuy}}">查看活动</router-link>
        </div>
        <!-- 遮罩层 -->
        <div class="shade" v-if="voteSuccess"></div>
        <!-- 分享 -->
        <wxShare :param="shareParam" />
    </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import top from '@/components/Index/header.vue'
import banner from '@/components/banner/index.vue'
import popup from '@/components/votePopup/index.vue'
import wxShare from '@/components/wxShare/index.vue'
import {getActivityDetailData,handleActionVote} from '@/api/activity'
export default {
    name:'ActivityDetail',
    components:{
        top,
        banner,
        popup,
        wxShare
    },
    beforeRouteEnter(to,from,next)
    {
        next( vm => {
            if(vm.keepAlive.indexOf(vm.$options.name) == -1) vm.handleAdd(vm.$options.name) 
        })
    },
    beforeRouteLeave(to,from,next)
    {
        if(to.name != 'Enroll')
        {
            this.handleRemove(this.$options.name)
        }
        next()
    },
    data(){
        return{
            isShow:true,
            mid:'', //用户id
            title:'详情', //标题
            status:'', //当前状态
            isOver:false, //活动状态
            voteSuccess:false, //投票成功弹框
            voteAnimate:true, // 弹窗动画
            list:{},
            photo:[], //图集
            sign:'', // 活动参与状态
            shareParam:{}, // 分享数据
            a_title:'', // 活动标题
        }
    },
    methods:{
        ...mapMutations({
            handleAdd:'handleAdd',
            handleRemove:'handleRemove'
        }),
        //获取数据
        handleGetData()
        {
            getActivityDetailData({mapStr:JSON.stringify({
                mid:this.mid,
                enroll_id:this.$route.query.id,
                activity_id:this.$route.query.activity_id
            })}).then( res => {
                //当前状态
                this.status = ~~res.data.sign
                //参与详情
                this.list = res.data.mapDetailed
                //标题
                this.title = `${this.list.attr1}-${this.list.id}号`
                //设置标题
                document.title = this.title
                //图集
                this.list.imgs = res.data.mapDetailed.pictures.split(';')
                //初始化预览插件
                this.$previewRefresh()
                //参与状态文字
                let text = '';
                //参与状态
                let disabled = false;
                //投票状态
                let voteStatus = false;
                //投票文字
                let voteText = ''
                //开始时间
                let start_time = new Date(this.list.start_time.replace(/\-/g, "/")).getTime()
                //结束时间
                let end_time = new Date(this.list.end_time.replace(/\-/g, "/")).getTime()
                //当前时间
                let now = Date.now()
                
                //活动开始
                if(now > start_time)
                {
                    //判断活动是否结束
                    if(now > end_time)
                    {
                        this.isOver = true
                        //投票文字
                        voteText = '已结束'
                        //禁止投票
                        voteStatus = true
                        //参与文字
                        text = '活动已经结束，查看更多活动'
                    }else
                    {
                        if(this.mid == this.list.mid)
                        {
                            switch(this.list.state)
                            {
                                case 0:
                                    text = '审核中'
                                    disabled = true
                                break;  
                                case 1:
                                    text = '去拉票'
                                break; 
                                case 2:
                                    text = '已驳回，重新提交'
                                    disabled = true
                                break;  
                            }
                        }else
                        {
                            //投票状态
                            voteStatus = Boolean(~~res.data.signTime)
                            //参与文字
                            text = Boolean(~~res.data.sign) ? '返回活动页' : '我要参与'
                            //参与状态
                            // disabled = Boolean(~~res.data.sign)
                        }
                        
                    }
                }else
                {
                    //投票文字
                    voteText = '未开始'
                    //禁止投票
                    voteStatus = true
                    //参与文字
                    text = '未开始'
                    //参与状态
                    disabled = true
                }
                this.list.status = {
                    text,
                    voteText,
                    disabled,
                    voteStatus
                } 
            })
        },
        //投票
        handleVote()
        {
            //不可投票
            if(this.list.status.voteStatus) 
            {
                let text = this.list.status.voteText ? '活动' + this.list.status.voteText : '每个活动每天只能投一次票'
                this.$layer.alert(text)
                return
            }
            //发送请求投票
            handleActionVote({
                mapStr:JSON.stringify({
                    mid:this.$getUserInfo().mid,
                    activity_id:this.$route.query.activity_id,
                    enroll_id:this.list.id,
                    enroll_mid:this.list.mid
                })
            }).then( res => {
                if(res.data.signData.indexOf('投票成功') == 0)
                {
                    //投票成功
                    this.list.status.voteStatus = true
                    //弹框
                    this.voteSuccess = true
                    // 清除活动列表缓存
                    this.handleRemove('ActivityList')
                }else
                {
                    //投票失败
                    this.$layer.alert('投票失败，请重试');
                }
            })
            
        },
        //关闭投票弹窗
        handleClosePopup()
        {
            this.voteAnimate = false

            setTimeout(() => {
                this.voteSuccess = false
                this.voteAnimate = true
            },200)
        },
        //页面跳转
        handleJoin()
        {
            //判断活动是否结束
            if(this.isOver)
            {
                //活动结束
                this.$router.push({
                    name:'Activity',
                    params:{
                        isInner:false,
                        active:0
                    }
                })
            }else
            {
                // 活动id
                let id = this.$route.query.activity_id
                // 活动参与状态
                let isBuy = this.$route.query.isBuy

                //判断是否自己参加的活动
                if(this.mid == this.list.mid)
                {
                    switch(this.list.state)
                    {
                        case 0:
                            //审核中
                            this.$router.replace({
                                path:'/ActivityList',
                                query:{
                                    id,
                                    isBuy
                                }
                            });
                        break; 
                        case 1:
                            // 活动标题
                            let a_title = this.a_title
                            let url = `${window.location.href}&isShare=true`;
                            let imgUrl = this.list.portrait.indexOf('http') != -1 ? this.list.portrait : 'http:' + this.list.portrait;
                            //去拉票
                            this.shareParam = {
                                title : '大尚国际-投票活动', // 分享标题
                                desc : `我正在参加${a_title}活动，快来帮我投一票吧！`, // 分享描述
                                link : url, // 分享链接
                                imgUrl, // 分享图标
                            }
                        break; 
                        case 2:
                            //已驳回
                            this.$router.push({
                                path:'/Enroll',
                                query:{
                                    activity_id:id,
                                    id:this.list.id
                                }
                            })
                        break;
                    }
                }else
                {
                    this.$router.replace({
                        path:'/ActivityList',
                        query:{
                            id,
                            isBuy
                        }
                    })
                }
            }
        },
    },
    mounted(){
        // 分享进来的
        if(this.$route.query.isShare)
        {
            sessionStorage.setItem('isBuy',this.$route.query.isBuy)
            sessionStorage.setItem('activityId',this.$route.query.activity_id)
        }
        //用户id
        this.mid = this.$getUserInfo().mid

        //活动标题
        this.a_title = sessionStorage.getItem('a_title') || '投票'

        //获取数据
        this.handleGetData()
    },
    computed:{
        ...mapState([
        'keepAlive'
        ])
    }
}
</script>

<style lang="scss" scoped>
    @import './css/style.scss';
</style>

