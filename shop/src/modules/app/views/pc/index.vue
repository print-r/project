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
    Watch,
} from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { getShop } from '@/api/shop';
import { ITheme } from '@/modules/admin/store/common/types';
import { CommonController  } from '../../controller/common';
const CommonVuex = namespace('common');
@Component({
    name: 'PC',
    components: {},
})
export default class  extends CommonController {

    // 店铺数据
    private list = [];

    // 背景图
    private background = '';

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
        getShop({
            mapStr: JSON.stringify({
                shop_ID: this.shopId,
            }),
        }).then( (res: any) => {
            this.list = JSON.parse(res.data.pc_template);
            this.handleChangeTheme(res.data.pc_templateID);
            this.background = this.getThemeList.pc[res.data.pc_templateID].background as string;
        }).catch( (err: any) => {
           this.$message.error('请求发生错误，请重新访问');
        });
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