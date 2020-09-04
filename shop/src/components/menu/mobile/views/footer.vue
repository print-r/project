<template>
    <div class="footer" :class="{fixed:isPreview}" :style="`${!previewEl && 'bottom: 0 !important;left: auto !important;'}`">
        <ul>
            <li class="list" 
            v-for="(item,key) in dataList" 
            :key="key" 
            :class="key==n?'active':''"
            >
                <div @click="handleJumpUrl(key)">
                    <p class="iconfont" :class="item.icon" v-if="item.icon == 'icon-fenlei'" style="font-size: .36rem"></p>
                    <p class="iconfont" :class="item.icon" v-else></p>
                    <p class="tit">{{item.name}}</p>
                </div>
                
            </li>
        </ul> 
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
const CommonVuex = namespace('common');
@Component({
    name: '',
    components: {},
})
export default class  extends Vue {
    // 预览状态
    @Prop({
        type: Boolean,
        default: false,
    }) private isPreview!: boolean;

    // active 下标位置
    @Prop({
        type: Number,
        default: 0,
    }) private footerIndex!: number;

    @CommonVuex.State('mid') private mid!: string;

    @CommonVuex.State('shopId') private shopId!: string;

    // 自定义，初始active位置
    private n = this.footerIndex ? this.footerIndex : 0;  

    private previewEl: any = null;
    // 底部的数据
    private dataList = [
        {
            icon: 'icon-shouye1',
            name: '首页',
            path: '/mobile',
            id: 0,
        },
        {
            icon: 'icon-fenlei',
            name: '商品分类',
            path: '/cate',
            id: 1,
        },  
        {
            icon: 'icon-kefu3',
            name: '客服',
            path: 'http://q.url.cn/s/Ecps3Tm?_type=wpa',
            id: 2,
        },      
    ];

    private handleJumpUrl(index: number) {
        if (index > 1) {
            window.open(this.dataList[index].path);
        } else {
            let mid = this.mid;
            let shopId = this.shopId;
            this.$router.push({
                path: this.dataList[index].path,
                query: {
                    mid,
                    shop_id: shopId,
                },
            });
        }
    }

    // 生命周期 - 创建之前
    private beforeCreate(): void {}

    // 生命周期 - 创建完成
    private created(): void {}

    // 生命周期 - 挂载之前
    private beforeMount(): void {}

    // 生命周期 - 挂载完成
    private mounted(): void {
        this.previewEl = document.querySelector('.preview_render');
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
@import '../style/footer.scss';
</style>