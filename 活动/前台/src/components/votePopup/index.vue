<template>
    <div>
        <div class="vote_img animated zoomIn" v-show="isOpen" @click="jumpUrl">
            <img  src="../../../static/images/vote.png" alt="">
            <div class="num">{{time}}</div>
        </div>
        <div class="shade" v-show="isOpen"></div>
    </div>
</template>

<script>
export default {
    name:'votePopup',
    props:{
        isOpen:Boolean,
        default:false
    },
    watch:{
        isOpen(val)
        {
           let timer = setInterval(() => {
                if(this.time <= 1)
                {
                    clearInterval(timer)
                    //跳转
                    location.href = this.url
                    return
                } 
                this.time--
            },1000);
        }
    },
    data(){
        return{
            url:process.env.NODE_ENV == 'production' ? process.env.BASE_API + '/discountIndex.do?type=1' : 'http://localhost' + process.env.BASE_API + '/discountIndex.do?type=1',
            time:3
        }
    },
    methods:{
        jumpUrl()
        {
            //跳转
            location.href = this.url
        }
    }
}
</script>

<style scoped>
    .vote_img
    {
        position: fixed;
        top: 50%;
        left: 50%;
        
        width: 540px;
        height: 708px;

        margin-left: -270px;
        margin-top: -354px;

        animation-duration: .3s !important;

        z-index:12;
    }

    .vote_img img
    {
        height: 100%;
    }

    .num
    {
        position: absolute;
        top: 46px;
        right: 23px;

        width: 62px;
        height: 62px;
        line-height: 62px;

        font-size: 40px;
        color:#fff;

        text-align: center;

        border-radius: 50%;

        background-color: rgba(0,0,0,.5);
    }
</style>