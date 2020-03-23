<template>
    <div>
        <!-- 活动结束 -->
        <div class="over_tips  animated" :class="animat ? 'zoomIn' : 'zoomOut'" v-show="isOver">
            <div class="over_text">活动结束啦</div>
                    <div class="watch_text">可在个人中心查看中奖记录</div>
                    <div class="over_btn">
                    <div @click="handleHidePopup">确定</div>
                    <div>
                        <router-link :to="{name:'Activity',params:{isInner:false,active:0}}">更多活动</router-link>
                    </div>
                </div>
            </div>
         <!-- 遮罩层 -->
        <div class="shade" v-show="isOver"></div>
    </div>
</template>

<script>
export default {
    name:'activityOver',
    props:{
        isOver:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return{
            animat:true,
        }
    },
    methods:{
        //关闭弹窗
        handleHidePopup()
        {
            this.animat = false
            setTimeout(() => {
                this.animat = true
                this.$emit('update:isOver',false)
            },100)
        }
    }
}
</script>

<style lang="scss" scoped>
    .over_tips
    {
        position: fixed;
        top: 50%;
        left: 50%;

        width: 508px;
        height: 272px;

        margin-left: -270px;
        margin-top: -136px;

        animation-duration: .3s !important;

       
        // height: 272px;

        text-align: center;

        padding: 40px;

        border-radius: 20px;

        background-color: #fff;

        box-sizing: border-box;

        z-index:13;

        .over_text
        {
            font-size: 28px;
            font-weight: 700;
        }

        .watch_text
        {
            height: 68px;
            
            margin:20px 0;
        }

        .over_btn
        {
            display: flex;
            justify-content: space-between;

            font-size: 22px;
            div
            {
                width: 198px;
                height: 56px;
                line-height: 56px;

                border-radius:30px;

                &:first-child
                {
                    color:$color;

                    border: 1.1px solid $color;

                }

                &:last-child
                {
                    color:#fff;
                    background-color: $color;
                }
            }
        }
    }
</style>
