<template>
    <div class="mobile">
         <div class="item" v-for="(item,index) in list" :key="index">
            <render :value="item" :mode="'mobile'" :key="index" :isPreview="true" :production="true"></render>
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
import { handleSetRem } from '@/utils/common';
const CommonVuex = namespace('common');
@Component({
    name: '',
    components: {},
})
export default class  extends Vue {
    
    // 店铺数据
    private list = [];

    // 保存商家id
    @CommonVuex.Mutation('handleSaveMid') 
    private handleSaveMid!: (mid: string) => void;

    // 保存主题
    @CommonVuex.Mutation('handleChangeTheme')
    private handleChangeTheme!: (theme: string) => void;

    // 生命周期 - 创建之前
    private beforeCreate(): void {
        handleSetRem();
    }

    // 生命周期 - 创建完成
    private created(): void {}

    // 生命周期 - 挂载之前
    private beforeMount(): void {}

    // 生命周期 - 挂载完成
    private mounted(): void {
        let params: any = this.$getUrlParams(['mid', 'shop_id', 'isPreview']);
        if (!params.shop_id || !params.mid) {
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
                let data: any = res.data;
                let theme = '';
                let list = [];
                // 预览
                if (params.isPreview) {
                    let previewData = JSON.parse(data.preview_template);
                    list = previewData.data;
                    theme = previewData.theme;
                } else {
                    list = JSON.parse(data.mobile_template);
                    theme = data.mobile_templateID;
                }
                this.list = list;
                this.handleChangeTheme(theme);
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