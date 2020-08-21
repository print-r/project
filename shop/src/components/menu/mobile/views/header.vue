<template>
    <div class="header" style="font-size: 1px;">
        <div class="header_top" v-if="!production">
            <img src="../../../../assets/images/header_top_a.png" alt="">
        </div>
        <div class="header_detail" :class="addedClass">
            <div class="bg" v-if="asideBgimg">
                <img :src="asideBgimg" alt="">
            </div>
            <div class="header_inner">
                <div class="shop_profil">
                    <div  class="logo_img">
                        <img src="http://cdn.dusun.com.cn/20/pimg/20191118/66011/293112/s4_600_600.jpg" alt="">
                    </div>
                    <div class="name name_bg">
                        花妍丽化妆品专卖店
                    </div>
                    <div class="start_dark">
                        <span class="start">企业认证</span>
                        <span class="scope">
                            <i class="scope_num">综合评分：5.0</i>
                        </span>
                    </div>
                    
                </div>
                <div class="follow_panel panel_bg" 
                v-if="isCollect" 
                @click="isCollect=!isCollect" >
                    <i class="iconfont icon-shoucangxingxing-xianxing"></i>
                    <i>收藏</i>
                </div>
                <div class="follow_panel panel_bg"
                @click="isCollect=!isCollect" 
                v-else>
                    已收藏
                </div>
            </div>
            <div class="site_content">
                <div class="searchbar search_bg">
                    <i class="iconfont icon-sousuo2 icon_bg"></i>
                    <i class="text text_bg">搜索</i>
                </div>
                <div class="navbar">
                    <ul class="navul">
                        <li class="navli nav_bg"
                        v-for="(value,key) in dataList" 
                        :key="key" 
                        :class="key==n?'nav_active':''" 
                        @click="n=key" >
                            <span class="name">{{value.name}}</span>
                            <span class="line" style="key==n?'left:0.24rem;':'left:0.32rem;'"></span>
                        </li>
                        
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang='ts'>
import {
    Component,
    Vue,
    Watch,
    Prop,
} from 'vue-property-decorator';
import {
    namespace,
} from 'vuex-class';
import { MenuFindData } from '@/types/menu';
const CommonVuex = namespace('common');
@Component({
    name: '',
    components: {},
})
export default class  extends Vue {
    // 获取主题
    @CommonVuex.State('theme') private theme!: string;

    // 接收父组件数据
    @Prop({
        required: true,
        type: Object,
        default: {},
    }) private value!: MenuFindData;

    // 获取当前环境
    @Prop({
        type: Boolean,
        default: false,
    }) private production!: boolean;

    private addedClass = '';
    private flag = false;
    private n = 0;  // 自定义，初始active位置
    private dataList = [
                {
                    name: '商品',
                    id: 0,
                },
                {
                    name: '上新',
                    id: 1,
                },     
            ];
    private isCollect = true;
    private asideBgimg = '';

    private handleChangeThemeStyle(): void {
        this.$nextTick(() => {
            let theme = this.value.mobile.theme[this.theme];
            this.asideBgimg = theme.backgroundImage;
            this.addedClass = theme.addedClass || '';
        });
    }

    @Watch('theme')
    private changeTheme(newVal: string, oldVal: string): void {
        this.handleChangeThemeStyle();
    }


    // 生命周期 - 创建之前
    private beforeCreate(): void {}

    // 生命周期 - 创建完成
    private created(): void {}

    // 生命周期 - 挂载之前
    private beforeMount(): void {}

    // 生命周期 - 挂载完成
    private mounted(): void {
        this.handleChangeThemeStyle();
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
@import '../style/header.scss';

</style>