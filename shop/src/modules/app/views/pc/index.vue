<template>
    <div class="pc" :style="`background:url(${background})`">
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
import { getShop } from '@/api/shop';
import { ITheme } from '@/modules/admin/store/common/types';
const CommonVuex = namespace('common');
@Component({
    name: '',
    components: {},
})
export default class  extends Vue {

    // 店铺数据
    private list = [];

    // 背景图
    private background = '';

    // 保存商家id
    @CommonVuex.Mutation('handleSaveMid') 
    private handleSaveMid!: (mid: string) => void;

    // 保存主题
    @CommonVuex.Mutation('handleChangeTheme')
    private handleChangeTheme!: (theme: string) => void;

    // 主题数据
    @CommonVuex.Getter('getThemeList') private getThemeList!: ITheme;

    // 生命周期 - 创建之前
    private beforeCreate(): void {}

    // 生命周期 - 创建完成
    private created(): void {}

    // 生命周期 - 挂载之前
    private beforeMount(): void {}

    // 生命周期 - 挂载完成
    private mounted(): void {
        let params: any = this.$getUrlParams(['mid', 'shop_id']);
        if (!params.mid || !params.shop_id) {
            this.$message.error('参数有误，3秒后跳转');
            setTimeout(() => {
                window.history.go(-1);
            }, 3000);
        } else {
            // 保存商家id
            this.handleSaveMid(params.mid);
            getShop({
               mapStr: JSON.stringify({
                   shop_ID: params.shop_id,
               }),
            }).then( (res: any) => {
                this.list = JSON.parse(res.data.pc_template);
                this.handleChangeTheme(res.data.pc_templateID);
                this.background = this.getThemeList.pc[res.data.pc_templateID].background as string;
            });
        }
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
.pc
{
    background-repeat: no-repeat !important;
    background-size: cover !important;
    background-position: center 0 !important;
}
</style>

<style lang="scss">
@include media();
</style>