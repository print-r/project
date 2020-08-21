<template>
    <div class="preview" v-if="isPreview">
        <div class="content animated fadeInDown" @click.stop="handleClose">
            <section class="view" @click.stop="">
                <div class="top">
                    <i class="i_t"></i>
                </div>
                <div class="preview_render" :style="`width:${size.width}px;height:${size.height}px;`">
                    <div class="item" v-for="(item,index) in list" :key="index">
                        <i class="place"></i>
                        <render :value="item" :mode="'mobile'" :key="index" :isPreview="true"></render>
                    </div>
                    <i class="footer_place"></i>
                </div>
                <div class="bottom">
                    <i class="i_b"></i>
                </div>
            </section>
        </div>
        <div class="qrcode" :class="{op:anima,zIndex:zIndex}">
            <div class="qr_section animated" :class="{slideInLeft:anima}">
                <div class="qr_content">
                    <div class="qr_img" id="qrcode" v-loading="loading"></div>
                    <div class="qr_link" @click="handleCopy">{{previewUrl}}</div>
                </div>
                <div class="tri"></div>
            </div>
        </div>
        <div class="shade"></div>
    </div>
</template>
<script lang='ts'>
import {
    Component,
    Vue,
    Prop,
    Watch,
} from 'vue-property-decorator';
import { MenuOption } from '@/types/menu';
import {
    namespace,
} from 'vuex-class';
import QRCode from 'qrcodejs2';
import Clipboard from 'clipboard';

const CommonVuex = namespace('common');
const ShopVuex = namespace('shop');
@Component
export default class  extends Vue {
    // 预览状态
    @Prop({
        type: Boolean,
        default: false,
    }) private isPreview!: boolean;

    // 店铺id
    @Prop({
        type: String,
        default: '',
    }) private shopId!: boolean;

    // 当前手机端尺寸
    @CommonVuex.State('phoneSize') private size!: any;

    // 商家id
    @CommonVuex.State('mid') private mid!: string;

    // 店铺数据
    @ShopVuex.State('shop') private list!: MenuOption[];

    // 二维码动画
    private anima = false;

    // 层级
    private zIndex = false;
    
    // 预览地址
    private previewUrl = '';

    private loading = true;

    @Watch('shopId')
    private changStatus(newVal: string, oldVal: string): void {
        if (newVal) {
            let baseUrl = 'http://www.dusun.com.cn';
            if (process.env.NODE_ENV === 'development' || process.env.VUE_APP_LOCAL_TEST === 'true') {
                baseUrl = `${process.env.VUE_APP_PREVIEW_IP}${process.env.VUE_APP_PROJECT}`;
            }
            setTimeout(() => {
                // 预览地址
                this.previewUrl = `${baseUrl}/api_decorating_shop.do#/mobile?isPreview=true&mid=${this.mid}&shop_id=${newVal}`;
                // 生成二维码
                this.handleCreateQrCode();
            }, 1000);
        }
    }

    // 关闭预览
    private handleClose(): void {
       this.$emit('update:isPreview', false);
    }

    // 生成二维码
    private handleCreateQrCode(): void {
        let remBase = parseFloat(document.documentElement.style.fontSize);
        let qrcode = new QRCode('qrcode', {
            width: remBase * 4,  
            height: remBase * 4,
            text: this.previewUrl, // 二维码地址
        });
        this.loading = false;
    }

    // 复制
    private handleCopy(): void {
        let clipboard = new Clipboard('.qr_link', {
            text: () => {
                return this.previewUrl;
            },
        });
        clipboard.on('success', () => {
            this.$message.success('复制成功');
            // 释放内存
            clipboard.destroy();
        });
        clipboard.on('error', () => {
            this.$message.error('复制失败');
            clipboard.destroy();
        });
    }

    // @Watch('isPreview')
    // private changeValue(newVal: boolean, oldVal: boolean) {
    //     if (newVal) {
    //         setTimeout(() => {
    //             this.anima = true;
    //         }, 500);
    //     }
    // }

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
        // 动画
        setTimeout(() => {
            this.anima = true;
            setTimeout(() => {
                this.zIndex = true;
            }, 300);
        }, 500);
    }

    // 生命周期 - 更新之前
    private beforeUpdate(): void {}

    // 生命周期 - 更新完成
    private updated(): void {}

    // 生命周期 - 销毁之前
    private beforeDestroy(): void {}

    // 生命周期 - 销毁完成
    private destroyed(): void {
        this.$emit('update:shopId', '');
    }

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