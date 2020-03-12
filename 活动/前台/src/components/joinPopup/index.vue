<template>
    <div>
        <div class="join_popup" :class="joinPopupAnimate ? 'zoomIn' : 'zoomOut'" v-if="joinPopup">
            <img class="icon_img" src="../../../static/images/popup_activity_pic.png" alt="">
            <div class="text_title">购买本期商品即可参与活动</div>
            <div class="text_tips">请先购买该商品，购买成功即可参赛，还有机会赢得免单机会，快来参与吧！</div>
            <div class="btn_buy" @click="handleJumpUrl">前往购买</div>
            <div class="close" @click="handleClosePopup">
                <img src="../../../static/images/popup_activity_close.png" alt="">
            </div>
        </div>
         <!-- 遮罩层 -->
        <div class="shade" v-if="joinPopup"></div>
    </div>
    
</template>
<script>
import {mapState,mapMutations} from 'vuex'
export default {
    name:'joinPopup',
    props:{
        joinPopup:{
            type:Boolean,
            default:false
        },
        product_id:{
            type:Number,
            default:0
        }
    },
    data(){
        return {
            joinPopupAnimate:true
        }
    },
    methods:{
        ...mapMutations({
            handleRemove:'handleRemove'
        }),
        // 关闭弹窗
        handleClosePopup()
        {
            // 关闭动画
            this.joinPopupAnimate = false
            setTimeout(() => {
               this.$emit('update:joinPopup',false)
               this.joinPopupAnimate = true
            },200)
        },
        // 跳转
        handleJumpUrl()
        {
            //清除活动列表缓存
            this.handleRemove('ActivityList');
            //商品详情
            location.href = process.env.NODE_ENV == 'production' ? `${process.env.BASE_API}/ds-${this.product_id}.html` : `http://localhost${process.env.BASE_API}/ds-${this.product_id}.html`
        }
    }
    
}
</script>
<style lang="scss" scoped>
.join_popup
{
    position: fixed;
    top: 166px;
    left: 50%;

    width: 612px;
    max-width: 612px;

    font-family: PingFang-SC-Bold;
    text-align: center;

    padding: 0 42px;
    margin-left: -306px;

    background: url('../../../static/images/popup_activity_bg.png') no-repeat;
    background-size: 100%;

    animation-duration: .3s !important;

    box-sizing: border-box;

    z-index:12;

    .icon_img
    {
        width: 40%;

        margin: 210px auto 62px;
    }

    .text_title
    {
        font-size: 32px;
        color: #7b90ef;
        margin-bottom: 38px;
    }

    .text_tips
    {
        font-family: PingFang-SC-Medium;
        font-size: 24px;
        color: rgba(0,0,0,.6);

        line-height: 40px;
    }

    .btn_buy
    {
        width: 480px;
        height: 80px;
        line-height: 80px;

        font-size: 30px;
        color: #fff;

        margin: 90px auto 132px;

        border-radius: 10px;
        background-color: #7b90ef;

    }

    .close
    {
        width: 65px;

        margin: 0 auto;
    }
}

</style>