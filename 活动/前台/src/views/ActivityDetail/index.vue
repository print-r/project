<template>
    <div class="layout-2">
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
            <!-- 参与 -->
            <div class="join">
                <div v-if="list.status" class="text" :class="{disabled:list.status.disabled}" @click="handleJoin" :style="`background-color:${$store.state.color}`">
                    {{list.status.text}}
                </div>
            </div>
        </div>
        <popup :isOpen="voteSuccess" />
    </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import top from '@/components/Index/header.vue'
import banner from '@/components/banner/index.vue'
import popup from '@/components/votePopup/index.vue'
import {getActivityDetailData,handleActionVote} from '@/api/activity'
export default {
    name:'ActivityDetail',
    components:{
        top,
        banner,
        popup
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
            mid:'', //用户id
            title:'详情', //标题
            status:'', //当前状态
            isOver:false, //活动状态
            voteSuccess:false, //投票成功弹框
            list:{},
            photo:[], //图集
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
                let start_time = new Date(this.list.start_time).getTime()
                //结束时间
                let end_time = new Date(this.list.end_time).getTime()
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
                            text = Boolean(~~res.data.sign) ? '返回' : '我要参与'
                            //参与状态
                            disabled = Boolean(~~res.data.sign)
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
                }else
                {
                    //投票失败
                    this.$layer.alert('投票失败，请重试');
                }
            })
            
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
                let activity_id = this.$route.query.activity_id || sessionStorage.getItem('activity_id')
                //判断是否自己参加的活动
                if(this.mid == this.list.mid)
                {
                    switch(this.list.state)
                    {
                        case 0:
                            //审核中
                            this.$router.go(-1)
                        break; 
                        case 1:
                            //去拉票
                        break; 
                        case 2:
                            //已驳回
                            this.$router.push({
                                path:'/Enroll',
                                query:{
                                    activity_id,
                                    id:this.list.id
                                }
                            })
                        break;
                    }
                }else
                {
                    if(!this.list.status.disabled)
                    {
                        //可参与
                        this.$router.push({
                            path:'/Enroll',
                            query:{
                                activity_id
                            } 
                        })
                    }else
                    {
                        //不可参与
                        this.$router.go(-1)
                    }
                }
            }
        }
    },
    mounted(){
        //用户id
        this.mid = this.$getUserInfo().mid
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

