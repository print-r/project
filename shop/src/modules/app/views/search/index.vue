<template>
    <div class="search">
        <div class="keyword">
            <div class="line">
                <div class="back" @click="goHistoryBack">
                    <i class="iconfont icon-zuobian"></i>
                </div>
                
                <div class="search">
                    <i class="search iconfont icon-sousuo2"></i>
                    <i class="clean iconfont icon-toupiaohuodong-shanchu"></i>
                    <input type="text" class="input" placeholder="关键字" v-model="searchWord" >
                </div>
                <button class="btn_search" @click="handleSearchProduct">搜索</button>
            </div>
        </div>
        <v-product :searchWord="searchWord" :cateId="cateId" :isPreview="true" :isFix="1"></v-product>
        <v-footer class="fix_footer" :footerIndex="footerIndex"></v-footer>
    </div>
</template>
<script lang='ts'>
import {
    Component,
    Prop,
    Vue,
    Watch,
} from 'vue-property-decorator';
import { CommonController  } from '../../controller/common';
import product from '@/components/menu/mobile/views/product.vue';
import footer from '@/components/menu/mobile/views/footer.vue';
import keyword from './keyword.vue';
import {
    namespace,
} from 'vuex-class';
const CommonVuex = namespace('common');
@Component({
    name: '',
    components: {
        'v-keyword': keyword,
        'v-product': product,
        'v-footer': footer,
    },
})
export default class  extends CommonController {
    // 搜索关键字
    private searchWord: any = '';
    // 分类id
    private cateId: any = '';
    // 地址
    private path = '/search';
    // 底部标志
    private footerIndex: number = 3;

    // 生命周期 - 创建之前
    private beforeCreate(): void {}

    // 返回上一页
    private goHistoryBack() {
        window.history.go(-1);
    }

    // 生命周期 - 创建完成
    private created(): void {
        // 先获取关键字，要在挂在前传值给 product组件
        this.searchWord = this.$route.query.searchWord;
        this.cateId = this.$route.query.cateId;
    }

    // 搜索商品
    private handleSearchProduct() {
        // console.log(this.searchWord);
        // this.searchWord = this.searchWord;
    }

    // 生命周期 - 挂载之前
    private beforeMount(): void {}

    // 生命周期 - 挂载完成
    private mounted(): void {
        console.log(this.$route.query.searchWord); 
        
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
@import './style/keyword.scss';
.fix_footer{
    position: fixed;
    z-index: 10;
    bottom: 0;
}

.nav_fix{
    position: fixed;
    width: 100%;
}
.product_fix{
    padding-top: 40px;
}
</style>