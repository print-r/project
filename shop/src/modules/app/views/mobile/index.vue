<template>
    <div class="mobile">
         <div class="item" v-for="(item,index) in list" :key="index">
            <render :value="item" :mode="'mobile'" :key="index" :isPreview="true" :production="true" :footerIndex="footerIndex"></render>
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
import { CommonController  } from '../../controller/common';
const CommonVuex = namespace('common');
@Component({
    name: 'Mobile',
    components: {},
})
export default class  extends CommonController {
    // 底部active 的坐标
    private footerIndex = 0;

    // 店铺数据
    private list = [];

    // 保存主题
    @CommonVuex.Mutation('handleChangeTheme')
    private handleChangeTheme!: (theme: string) => void;

    // 生命周期 - 创建之前
    private beforeCreate(): void {}

    // 生命周期 - 创建完成
    private created(): void {}

    // 生命周期 - 挂载之前
    private beforeMount(): void {}

    // 生命周期 - 挂载完成
    private mounted(): void {
        let isPreview = this.$getUrlParams('isPreview') as string; 
        getShop({
            mapStr: JSON.stringify({
                shop_ID: this.shopId,
            }),
        }).then( (res: any) => {
            let data: any = res.data;
            let theme = '';
            let list = [];
            // 预览
            if (isPreview) {
                let previewData = JSON.parse(data.preview_template);
                list = previewData.data;
                theme = previewData.theme;
            } else {
                list = JSON.parse(data.mobile_template);
                theme = data.mobile_templateID;
            }
            this.list = list;
            this.handleChangeTheme(theme);
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
.mobile
{
    padding-bottom: .98rem;
}
</style>

<style>
body {
    max-width: 750px;
    
    margin: 0 auto;
}
</style>