<template>
    <div class="cate">
        <div class="header">
            <div class="header_inner">
                <div class="shop_profil">
                    <div  class="logo_img">
                        <img src="http://cdn.dusun.com.cn/20/pimg/20191118/66011/293112/s4_600_600.jpg" alt="">
                    </div>
                    <div class="name name_none">
                        花妍丽化妆品专卖店
                    </div>
                    <div class="start_dark">
                        <span class="start">企业认证</span>
                        <span class="scope">
                            <i class="scope_num">5.0</i>
                        </span>
                    </div>
                    
                </div>
                <div class="follow_panel panel_none" 
                v-if="isCollect" 
                @click="isCollect=!isCollect" >
                    已收藏
                </div>
                <div class="follow_panel panel_none"
                @click="isCollect=!isCollect" 
                v-else>
                    <i class="iconfont icon-shoucangxingxing-xianxing"></i>
                    <i>收藏</i>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="search"  @click="handleIntoSearch">
                <span class="iconfont icon-sousuo2"></span>
                <span class="text">搜索</span>
            </div>
            <div class="shop_class">
                <div class="all_shop">
                    <span class="line"></span>
                    <span class="text">全部商品</span>
                    <span class="iconfont icon-you1"></span>
                </div>
                <div class="shop_list"
                v-for="(item, index) in shopClassList"
                :key="index">
                    <div class="title">
                        <span class="line"></span>
                        <span class="text">{{item.NAME}}</span>
                        <span class="iconfont icon-you1"></span>
                    </div>
                    <div class="shop clear">
                        <div class="list" :class="key%2===0 ? 'fl': 'fr'"
                        v-for="(value, key) in item.threeClassPC"
                        :key="key">
                            <div class="name" @click="handleJumpUrl(value.ID)">{{value.NAME}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <v-footer class="fix_footer" :footerIndex="footerIndex"></v-footer>
    </div>
</template>
<script lang='ts'>
import {
    Component,
    Vue,
    Watch,
} from 'vue-property-decorator';
import { CommonController  } from '../../controller/common';
import footer from '@/components/menu/mobile/views/footer.vue';
import { getShopClass } from '@/api/cate';
import {
    namespace,
} from 'vuex-class';
const CommonVuex = namespace('common');
@Component({
    name: '',
    components: {
        'v-footer': footer,
    },
})
export default class  extends CommonController {
    // 底部active 的坐标
    private footerIndex = 1;
    // 判断是否收藏--状态
    private isCollect = false;
    // 分类id
    private cateId = '';
    // 分类数据
    private shopClassList = [];

    // 获取分类数据
    private getShopClass() {
        let that = this;
        let data = {
            member_id: this.mid,
        };
        getShopClass(data).then((res: any) => {
            that.shopClassList = res.data.data;
        });
        
    }

    // 分类跳转
    private handleJumpUrl(id: any) {
        this.$router.push({
            path: '/search',
            query: {
                cateId: id,
                searchWord: '',
                mid: this.mid,
                shop_id: this.shopId,
            },
        });
    }

    // 跳转到 搜索页
    private handleIntoSearch(): void {
        console.log(1111, this.mid, this.shopId); 
        this.$router.push({
            path: '/keyword',
            query: {
                mid: this.mid,
                shop_id: this.shopId,
            },
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
       this.getShopClass();
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
</style>