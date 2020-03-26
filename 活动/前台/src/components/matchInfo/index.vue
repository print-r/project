<template>
    <div v-show="!isJoin">
        <div class="not_participate">
            <div class="left_icon">{{(listMap.id && listMap.rank) || '-' }}</div>
            <div class="center">
                <div class="avatar">
                    <img :src=" $getUserInfo().mid ? (listMap.id && listMap.portrait) || $getUserInfo().img : require('../../../static/images/login.png')" alt="">
                </div>
                <div class="text">
                    <div class="activity_tips"> {{ $getUserInfo().mid ? (listMap.id && 'ID：' + listMap.id)  || '您还没有参加活动~' : '您还未登录'}} </div>
                    <div class="not_votes">{{ (listMap.id && listMap.gain_votes + '票') || '暂无票数'}}</div>
                </div>
            </div>
            <div class="right_btn wxShare" @click="handleJoin" :style="`background-color:${$store.state.color}`">
                <div>{{$getUserInfo().mid ? listMap.id ? listMap.isOver ?'已结束':'拉助力' : '去参赛' : '去登录'}}</div>
            </div>
        </div>
        <!-- 分享 -->
        <wxShare :param="shareData" />
    </div>
</template>

<script>
import wxShare from '@/components/wxShare/index.vue'
import {handleJumpUrl} from '@/utils/common'
export default {
    name:'matchInfo',
    components:{
        wxShare
    },
    props:{
        isJoin:{
            type:Boolean,
            default:true
        },
        listMap:{
            type:[Object,String],
            default:() => { return {}}
        },
        sign:{
            type:String,
            default:'0'
        },
        shareParam:{
            type:Object,
            default:() => { return {}}
        }
    },
    watch:{
       listMap:{
           handler(val){
               this.$emit('update:listMap',typeof this.listMap == 'string' ? JSON.parse(this.listMap) :this.listMap)
           },
           deep:true
       }
    },
    data(){
        return{
            shareData:{}
        }
    },
    methods:{
        handleJoin()
        {
            if(this.$getUserInfo().mid)
            {
                 //未参赛
                if(JSON.stringify(this.listMap) == '{}')
                {
                    // 需要购买商品才可参与活动
                    if(this.sign == '4')
                    {
                        // 显示弹窗
                        this.$emit('update:joinPopup',true)
                        return
                    }
                    this.$router.push({
                        path:'/Enroll',
                        query:{
                            activity_id:this.$route.query.id || sessionStorage.getItem('activityId')
                        }
                    })
                }else
                {
                    if(this.listMap.isOver)
                    {
                        this.$router.replace({
                            path:'/Activity',
                        })
                    }else {
                        this.shareData = Object.assign({},this.shareParam)
                    }
                }
            }else
            {
                // 未登录
                handleJumpUrl('login')
            }
           
        }
    },
}
</script>

<style lang="scss" scoped>
    .not_participate
    {
        position: fixed;
        bottom: 100px;

        display: flex;
        align-items: center;
        
        width: 100%;
        max-width: $max_width;
        height: 112px;

        padding:12px 44px;

        background-color: #fff;

        // box-shadow: 0 10px 20px #999;
        box-sizing: border-box;

        .left_icon
        {
            flex:1;

            font-family: DINPro-Bold;
            font-size: 36px;
            font-weight: 700;
            color:#333;
            
            text-align: center;
        }

        .center
        {
            display: flex;
            
            width: 462px;
            .avatar
            {
                width: 88px;
                height: 88px;

                margin:0 24px 0 20px;

                border-radius: 50%;

                overflow: hidden;
            }
            .text
            {
                .activity_tips
                {
                    font-family: PingFangSC-Mediu;
                    font-size: 28px;
                    font-weight: 700;
                }
                .not_votes
                {
                    font-size: 22px;
                    color:#888;

                    margin-top: 3px;
                }
            }
        }
        .right_btn
        {
            display: flex;
            align-items: center;
            justify-content: center;

            width: 128px;
            height: 56px;

            color:#fff;
            font-size: 26px;

            border-radius: 30px;

            background-color: $act_color;

        }
    }
</style>