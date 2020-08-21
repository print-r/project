<template>
    <div class="coupon layout">
        <div class="content clear">
            <div class="coupon_title fl">
                <div class="cont" :class="`cont_${couponData.length}`">
                    <p class="top">coupon</p>
                    <p class="iconfont icon-guanbi2"></p>
                    <p class="tit">先领券再下单</p>
                </div>
                <div class="line"></div>
            </div>
            <div class="coupon_swipper fl">
                <div class="coupont_list fl" v-for="(item, index) in couponData" :key="index">
                    <div class="cont" :class="`cont_${couponData.length}`">
                        <div class="price">
                            <span class="tit">￥</span>
                            <span class="num">{{item.price}}</span>
                        </div>
                        <div class="title">{{item.title}}</div>
                        <button class="btn_coupon">立即领取</button>
                    </div>
                    <div :class="index === couponData.length-1 ? '': 'line'"></div>
                </div>
            </div>
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
@Component
export default class  extends Vue {
    // 自定义，优惠券数据
    private couponData = [
                {
                    title: '店铺无门槛',
                    price: 5,
                    id: 0,
                },  
                {
                    title: '全场满299元使用',
                    price: 30,
                    id: 1,
                }, 
                {
                    title: '全场满599元使用',
                    price: 60,
                    id: 2,
                },  
            ];
    // 生命周期 - 创建之前
    private beforeCreate(): void {}

    // 生命周期 - 创建完成
    private created(): void {}

    // 生命周期 - 挂载之前
    private beforeMount(): void {}

    // 生命周期 - 挂载完成
    private mounted(): void {
        console.log(this.couponData);
    }

    // 生命周期 - 更新之前
    private beforeUpdate(): void {}

    // 生命周期 - 更新完成
    private updated(): void {}

    // 生命周期 - 销毁之前
    private beforeDestroy(): void {}

    // 生命周期 - 销毁完成
    private destroyed(): void {}

    // 使用keep-alive缓存进入页面触发
    private activated(): void {}

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
 @import '../style/coupon.scss'
</style>