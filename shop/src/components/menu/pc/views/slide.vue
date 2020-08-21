<template>
    <div class="slide layout" >
        <swiper
        v-if="show && this.value.list.length" 
        class="slide_swiper"
        :options="swiperOption"
        ref="mySwiper"
        >
            <swiper-slide v-for="(item,index) in this.value.list" :key="index">
                <a :href="item.url || 'javascript:void(0);'">
                    <img :src="item.img" alt="">
                </a>
            </swiper-slide>
            <div class="swiper-pagination-pc"  slot="pagination"></div>
            <div v-if="this.value.list.length > 1" class="swiper-button-prev swiper-button-prev-left swiper-button-pc" slot="button-prev" @click="handlePrev"></div>
            <div v-if="this.value.list.length > 1" class="swiper-button-next swiper-button-next-right swiper-button-pc" slot="button-next" @click="handleNext"></div>
        </swiper>
        <div class="seat" v-if="!this.value.list.length">
            <img src="../../../../assets/images/pic_add.png" alt="">
        </div>
    </div>
</template>
<script lang='ts'>
import {
    Component,
    Vue,
    Prop,
    Watch,
} from 'vue-property-decorator';

import { MenuFindData } from '@/types/menu';

@Component
export default class Slide extends Vue {
    private show = true;
    // 接收父组件数据
    @Prop({
        required: true,
        type: Object,
        default: {},
    }) private value!: MenuFindData;

    // swiper 配置
    private get swiperOption(): object {
        return this.value.list.length > 1 ? {
            observer: true, // 修改swiper自己或子元素时，自动初始化swiper
            observeParents: true, // 修改swiper的父元素时，自动初始化swiper
            autoplay: 3000,
            autoplayDisableOnInteraction: false, // 滑动后是否继续轮播
            loop: true,
            pagination: '.swiper-pagination-pc',
            paginationClickable: true,
            simulateTouch: false, // 禁止鼠标滑动切换
        } : {};
    }

    // 数据监听
    @Watch('value', { deep: true })
    private changeRouter(
        newVal: any,
        oldVal: any,
    ): void {
        // 重新初始化
        this.show = false;
        this.$nextTick(() => {
            this.show = true;
        });
    }

    // 上一页
    private handlePrev(): void {
        (this.$refs.mySwiper as any).swiper.slidePrev();
    }

    // 下一页
    private handleNext(): void {
        (this.$refs.mySwiper as any).swiper.slideNext();
    }

    // 生命周期 - 创建之前
    private beforeCreate() {}

    // 生命周期 - 创建完成
    private created() {}

    // 生命周期 - 挂载之前
    private beforeMount() {}

    // 生命周期 - 挂载完成
    private mounted() {}
    
    // 生命周期 - 更新之前
    private beforeUpdate() {}

    // 生命周期 - 更新完成
    private updated() {}

    // 生命周期 - 销毁之前
    private beforeDestroy() {}

    // 生命周期 - 销毁完成
    private destroyed() {}

    // 使用keep-alive缓存进入页面触发
    private activated() {}

    // 进入路由前
    private beforeRouteEnter(to: any, from: object, next: (vm: any) => void): void {
        next( (vm: any) => {});
    }

    // 离开路由后
    private beforeRouteLeave(to: any, from: object, next: () => void): void {
        next();
    }
}
</script>
<style lang='scss' scoped>
@import '../style/slide.scss';
</style>

<style lang='scss'>
    .swiper-pagination-pc
    {
        position: relative;
        top: pxToEm(-50) !important;
        bottom: auto !important;

        text-align: center;

        z-index: 10;
        
        .swiper-pagination-bullet
        {
            width: pxToEm(30) !important;
            height: 5px !important;

            border-radius: 0 !important;

            background-color: rgb(1,1,1) !important;

            opacity: .3 !important;
        }

        .swiper-pagination-bullet-active
        {
            opacity: 1 !important;
            background-color: #E6232B !important;
        }
    }

    .swiper-button-prev-left
    {
        left: 0 !important;
    }
    
    .swiper-button-next-right
    {
        right: 0 !important;
    }

    .swiper-button-pc
    {
        top: 50% !important;

        width: pxToEm(40) !important;
        height: pxToEm(80) !important;

        margin: 0 !important;

        background-repeat: no-repeat !important;
        background-size: pxToEm(25) pxToEm(40) !important;
        background-color: rgba(0,0,0,.5);

        transform: translateY(-50%);

        filter: grayscale(100%) brightness(10);
    }
</style>