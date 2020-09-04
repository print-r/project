<template>
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

    
</template>
<script lang='ts'>
import {
    Component,
    Vue,
    Prop,
    Watch,
} from 'vue-property-decorator';
import { CommonController  } from '../../controller/common';
import footer from '@/components/menu/mobile/views/footer.vue';
@Component({
    name: '',
    components: {
        'v-footer': footer,
    },
})
export default class  extends CommonController {
    // 搜索关键字
    private searchWord = '';
    // 地址
    private path = '/search';

    // 生命周期 - 创建之前
    private beforeCreate(): void {}

    // 返回上一页
    private goHistoryBack() {
        window.history.go(-1);
    }

    // 搜索商品
    private handleSearchProduct() {
        let searchWord = this.searchWord;
        this.$router.push({
            path: this.path,
            query: {
                searchWord,
                mid: this.mid,
                shop_id: this.shopId,
            },
        });
    }
    // 生命周期 - 创建完成
    private created(): void {}

    // 生命周期 - 挂载之前
    private beforeMount(): void {}

    // 生命周期 - 挂载完成
    private mounted(): void {
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
@import '../../../../assets/style/iconfont/iconfont.css';
@import './style/keyword.scss';
</style>