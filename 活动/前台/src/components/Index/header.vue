<template>
    <div class="top" v-if="!weChat" >
        <div >
            <span class="back iconfont " @click="handleGoBack" :class="isGoBack ? 'icon-zuobian' : 'icon-toupiaohuodong-toupiao border'"></span>
            <h3 class="title">{{ title || $route.meta.title}}</h3>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
    name:'top',
    props:{
        isGoBack:{
            type:Boolean,
            default:true
        },
        title:{
            type:String,
            default:''
        },
        current:{
            type:Number,
            default:0
        }
    },
    methods:{
        handleGoBack(){
            if(!this.isGoBack)
            {
                window.location.href = 'http://www.dusun.com.cn/';
                return
            }
            if(this.$route.name == 'Cropper')
            {
                this.$router.replace({
                   path:'/Enroll',
               })
               return
            }else if(this.$route.name == 'Activity' || this.$route.name == 'Personal')
            {
                this.$router.replace({
                    name:'Activity'
                }).catch(err => {err})
                this.$emit('update:isGoBack',false)
                this.$emit('update:current',0)
                return
            }else if(this.$route.query.isGoBack)
            {
                this.$router.replace({
                    name:'Personal',
                    params:{
                        isInner:true
                    }
                })
                return
            }else if(this.$route.name == 'ActivityList' || this.$route.name == 'RankingList' || this.$route.name == 'ActivityIntro')
            {
                this.$router.replace({
                    path:'/Activity',
                })
                return
            }else if(this.$route.name == 'ActivityDetail' && this.$route.query.isBuy)
            {
                this.$router.replace({
                    path:'/ActivityList',
                    query:{
                        id:this.$route.query.activity_id,
                        isBuy:this.$route.query.isBuy
                    }
                })
                return
            }
            this.$router.go(-1)
        }
    },
    computed:{
        ...mapState([
        'weChat'
        ])
    },
}
</script>

<style lang="scss" scoped>
    .top
    {
        position: absolute;
        top: 0;
        
        font-family: SFProDisplay-Medium;
        font-size: 34px;

        width: 100%;
        max-width: $max_width;
        height: 108px;
        line-height: 108px;

        color:#333;
        
        z-index: 10;

        .back
        {
            margin-left: 24px;
            font-size: 35px;
        }
        .title
        {
            position: absolute;
            left: 50%;
            top: 0;

            transform: translateX(-50%);

            font-weight: 700;

            opacity: 0.9;
            
        }
    }

    .border
    {
        padding:8px 10px;

        border-radius: 50%;
        border:1.5px solid #eee;
    }
    
</style>