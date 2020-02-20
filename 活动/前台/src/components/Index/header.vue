<template>
    <div class="top">
       <div>
            <span class="back iconfont icon-zuobian" @click="handleGoBack" v-if="isGoBack"></span>
            <h3 class="title">{{ title || $route.meta.title}}</h3>
       </div>
    </div>
</template>
<script>
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
            
            if(this.$route.name == 'Cropper')
            {
                this.$router.replace({
                   path:'/Enroll',
               })
               return
            }else if(this.$route.name == 'Activity')
            {
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
            }
            
            this.$router.go(-1)
        }
    }
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
    
</style>