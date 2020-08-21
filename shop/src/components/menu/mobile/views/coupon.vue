<template>
    <div style="margin-bottom:.2rem">
        <img src="../../../../assets/images/coupon.png" alt="">
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
export default class  extends Vue {

    // 接收父组件数据
    @Prop() private value!: MenuFindData;

    // 数据监听
    // @Watch('value')
    // private valueChange(newVal, oldVal): void {}

    // 计算属性
    // private get columns() { return }
    // private set value(): void { return }

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

</style>