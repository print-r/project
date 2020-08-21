<template>
    <div class="preview" :style="{background:`url(${background})`}">
        <div class="item" v-for="(item,index) in list" :key="index">
            <render :value="item" :mode="'pc'" :key="index" :isPreview="true"></render>
        </div>
    </div>
</template>
<script lang='ts'>
import {
    Component,
    Vue,
    Watch,
} from 'vue-property-decorator';
import {
    namespace,
} from 'vuex-class';
import { ITheme } from '@/modules/admin/store/common/types';
const CommonVuex = namespace('common');
@Component({
    name: 'preview',
    components: {},
})
export default class  extends Vue {

    // 数据列表
    private list = [];

    // 背景图片
    private background = '';

    // 保存商家id
    @CommonVuex.Mutation('handleSaveMid')
    private handleSaveMid!: (mid: string) => void;

    // 保存主题
    @CommonVuex.Mutation('handleChangeTheme')
    private handleChangeTheme!: (theme: string) => void;

    // 主题数据
    @CommonVuex.Getter('getThemeList') private getThemeList!: ITheme;

    // 数据监听
    // @Watch('属性名')
    // private valueChange(newVal: any, oldVal: any): void {}

    // 深监听 immediate: true
    // @Watch('属性名', { deep: true })
    // private changeRouter(newVal: any, oldVal: any): void {}

    // 计算属性
    // private get columns() { return }
    // private set value(): void { return }

    // 生命周期 - 创建之前
    private beforeCreate(): void {}

    // 生命周期 - 创建完成
    private created(): void {}

    // 生命周期 - 挂载之前
    private beforeMount(): void {}

    // 生命周期 - 挂载完成
    private mounted(): void {
        let mid  = this.$getUrlParams('mid') as string;
        if (!mid) {
            this.$message.error('参数有误，3秒后关闭页面');
            setTimeout(() => {
                window.opener = null;
                window.open('', '_self');
                window.close();
            }, 3000);
            return;
        }
        // 保存商家ID
        this.handleSaveMid(mid);
        this.list = JSON.parse(localStorage.getItem('pcMenuData') as string);
        this.handleChangeTheme(localStorage.getItem('theme') as string);
        this.background = this.getThemeList.pc[localStorage.getItem('theme') as string].background as string;
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
@import './style/index.scss';
</style>