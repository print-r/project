<template>
    <div class="layout">
        <top :isGoBack="false"/>
        <div class="section">
            <img src="../../../static/images/success.jpg" class="icon_img">
            <div class="text">报名成功</div>
            <div class="tips">
                最快1个工作日之内审核完毕，审核结果会以短信通知您
            </div>
            <div class="btn">
                <router-link :to="{path:'/Personal'}">查看审核结果</router-link>
            </div>
            <div class="more_act">
                <router-link :to="{path:'/Activity'}">查看更多活动</router-link>
            </div>
            <div class="banner">
                <banner />
            </div>
        </div>
    </div>
</template>

<script>
import top from '@/components/Index/header.vue'
import banner from '@/components/banner/index.vue'
export default {
    name:'SuccessEnroll',
    components:{
        top,
        banner
    }
}
</script>

<style lang="scss" scoped>
    @import './css/style.scss';
</style>