<template>
    <div class="header">
        <div class="logo">
           <div class="logo_img">
             <img src="../../assets/images/logo.png" alt="">
           </div>
           <i class="line"></i>
           <span class="logo_title">店铺装修</span>
        </div>
        <div class="btn">
            <div class="preview" @click="handleOpenPreview">
                <span>预览</span>
            </div>
            <div class="submit" :class="{forbid:isPubList}" v-loading="isPubList" @click="handlePubList">
                <span>发布</span>
            </div>
        </div>
        <preview v-if="isPreview" :isPreview.sync="isPreview" :shopId.sync="shopId"></preview>
    </div>
</template>
<script lang='ts'>
import {
    Component,
    Vue,
    Prop,
    Watch,
} from 'vue-property-decorator';
import {
    namespace,
} from 'vuex-class';
import preview from '@/components/preview/index.vue';
import { MenuOption } from '@/types/menu';
import { submit, sendPreview } from '@/api/publist';

const CommonVuex = namespace('common');
const ShopVuex = namespace('shop');
@Component({
    name: '',
    components: {
        preview,
    },
})
export default class  extends Vue {

    // 当前主题
    @CommonVuex.State('theme') private theme!: string;

    // 商家id
    @CommonVuex.State('mid') private mid!: string;

    // 修改数据发生变化状态
    @CommonVuex.Mutation('handleChangeEditStatus')
    private handleChangeEditStatus!: (status: boolean) => void;

    // 店铺数据
    @ShopVuex.State('shop') private menuData!: MenuOption[];

    // 预览状态
    private isPreview: boolean = false;

    // 发布状态
    private isPubList = false;

    // 店铺id
    private shopId = '';

    // 请求状态
    private requestStatus = false;

    // 预览
    private handleOpenPreview(): void {
        
        if (this.$route.name === 'mobile') {
                if (this.requestStatus) {
                    this.$message.error('操作频繁，请稍后再试！');
                    return;
                }
                // 显示预览
                this.isPreview = true;
                // 正在请求
                this.requestStatus = true;
                // 保存预览数据
                sendPreview({
                    mapStr: JSON.stringify({
                        preview_template: JSON.stringify({
                            data: this.menuData,
                            theme: this.theme,
                        }),
                    }),
                }).then((res: any) => {
                    this.requestStatus = false;
                    this.shopId = res.data.shop_ID;
                }).catch((err: any) => {
                    this.requestStatus = false;
                    this.$message.error('预览失败，请稍后重试！');
                });
                
            } else {
                window.open(`${location.origin}${location.pathname}#/preview?mid=${this.mid}`);
            }
    }

    // 发布
    private handlePubList(): void {
        if (this.isPubList) {
            this.$message.error('正在发布中，请勿重复发布！');
            return;
        }
        // 正在发布
        this.isPubList = true;
        // 参数
        let mapStr: any = {
            pc_template: '',
            pc_templateID: '',
            mobile_template: '',
            mobile_templateID: '',
            list: [],
        };
        // 当前端
        let mode = (this.$route.name as string).toLocaleLowerCase() + '_';
        // 模板数据
        mapStr[mode + 'template'] = JSON.stringify(this.menuData);
        // 主题id
        mapStr[mode + 'templateID'] = this.theme;
        try {
            // 保存轮播图图片
            this.menuData.forEach(( val: MenuOption) => {
                if (val.template === 'slide') {
                    val.data.list.map((item: any) => {
                        mapStr.list.push({
                            picture_url: item.img,
                        });
                    });
                    // 终止循环
                    throw Error;
                }
            });
        } catch (e) {}

        setTimeout(() => {
            // 提交数据
            submit({
                mapStr: JSON.stringify(mapStr),
            }).then( (res: any) => {
                if (res.data.code === '200') {
                    // 移除监听页面刷新关闭事件
                    this.handleChangeEditStatus(false);
                    this.$message.success('发布成功');
                } else {
                    this.$message.error('发布失败，请重试！');
                }
                this.isPubList = false;
            }).catch( (err: any) => {
                this.isPubList = false;
            });
        }, 1000);
    }

    // 生命周期 - 创建之前
    private beforeCreate(): void {}

    // 生命周期 - 创建完成
    private created(): void {}

    // 生命周期 - 挂载之前
    private beforeMount(): void {}

    // 生命周期 - 挂载完成
    private mounted(): void {}

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
@import './style/header.scss';
</style>

<style lang="scss">
.submit
{
     .el-loading-mask
    {
        display: flex;
        justify-content: center;
        // align-items: center;
    }
    .el-loading-spinner,.circular
    {
        top: auto !important;
        
        width: pxToEm(30) !important;
        height: pxToEm(30) !important;

        margin: 0 !important;
    }
}
</style>