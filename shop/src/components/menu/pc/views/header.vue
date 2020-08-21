<template>
    <div class="header_name">
        <top />
        <div class="name" :style="`background-color:${navImg}`">
            <!-- <img :src="navImg" style="position: absolute; z-index: -1;"> -->
            <p :style="{color: nameColor, background: `url(${navImg}) 100% no-repeat`}">花妍丽化妆品专卖店</p>
        </div>
        <div class="nav_swipper" :style="{background: backgroundColor}">
            <div class="nav layout" :style="{color: fontColor}">
                <div class="navbar clear">
                    <div class="nav_list fl"
                    v-for="(value,key) in dataList" 
                    :key="key" 
                    :class="key==n?'nav_active_w':''" 
                    @click="n=key">{{value.name}}</div>
                </div>
                <div class="module" v-if="isCollect" 
                @click="isCollect=!isCollect">
                    <i>已收藏</i>
                </div>
                <div class="module" v-else 
                @click="isCollect=!isCollect">
                    <i class="iconfont icon-shoucangxingxing-xianxing"></i>
                    <i>收藏</i>
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
import {
    namespace,
} from 'vuex-class';
import top from './top.vue';
import { MenuFindData } from '@/types/menu';
const CommonVuex = namespace('common');
@Component({
    components: {
        top,
    },
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

    // 预览状态
    @Prop({
        type: Boolean,
        default: false,
    }) private isPreview!: boolean;

    // 自定义，导航栏初始active位置
    private n = 0; 
    // 自定义，导航栏数据
    private dataList = [
                {
                    name: '首页',
                    id: 0,
                },
                {
                    name: '分类',
                    id: 1,
                },     
            ];
    // 判断是否收藏 true-收藏
    private isCollect = false;
    // name字体颜色
    private nameColor = '';
    // nav导航 背景图片
    private navImg: string = '  ';
    // nav导航 背景颜色
    private backgroundColor = '';
    // nav导航 字体颜色
    private fontColor = '';

    @Watch('theme')
    private changeTheme(newVal: string, oldVal: string): void {
       this.init();
    }

    // 初始化
    private init(): void {
        this.$nextTick(() => {
            const headerStyle = this.value.pc.theme[this.theme];
            this.nameColor = headerStyle.shopNameColor;
            this.navImg = headerStyle.backgroundImage;
            this.backgroundColor = headerStyle.backgroundColor;
            this.fontColor = headerStyle.navColor;
        });
    }
    // 生命周期 - 创建之前
    private beforeCreate(): void {}

    // 生命周期 - 创建完成
    private created(): void {}

    // 生命周期 - 挂载之前
    private beforeMount(): void {}

    // 生命周期 - 挂载完成
    private mounted(): void {
        this.init();
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
    @import '../style/header.scss'
</style>