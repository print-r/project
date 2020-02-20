<template>
    <div v-show="!isJoin">
        <div class="not_participate">
            <div class="left_icon">{{(listMap.id && listMap.rank) || '-' }}</div>
            <div class="center">
                <div class="avatar">
                    <img :src="(listMap.id && listMap.portrait) || $getUserInfo().img" alt="">
                </div>
                <div class="text">
                    <div class="activity_tips"> {{ (listMap.id && 'ID：' + listMap.id)  || '您还没有参加活动~'}} </div>
                    <div class="not_votes">{{ (listMap.id && listMap.gain_votes + '票') || '暂无票数'}}</div>
                </div>
            </div>
            <div class="right_btn" :style="`background-color:${$store.state.color}`">
                <div  @click="handleJoin">{{listMap.id ? listMap.isOver ?'已结束':'拉助力' : '去参赛'}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'matchInfo',
    props:{
        isJoin:{
            type:Boolean,
            default:true
        },
        listMap:{
            type:[Object,String],
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
    methods:{
        handleJoin()
        {
            //未参赛
            if(JSON.stringify(this.listMap) == '{}')
            {
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
                    console.log('活动结束了')
                }else {
                    console.log('拉助力')
                }
            }
        }
    }
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
                    font-size: 12px;
                    color:#888;

                    margin-top: 3px;
                }
            }
        }
        .right_btn
        {
            width: 128px;
            height: 56px;
            line-height: 56px;

            color:#fff;
            font-size: 26px;

            text-align: center;

            border-radius: 30px;

            background-color: $act_color;

        }
    }
</style>