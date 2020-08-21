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
            <div class="search">
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
                            <div class="name">{{value.NAME}}</div>
                        </div>
                    </div>
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
} from 'vue-property-decorator';
import { getShopClass } from '@/api/cate';
import {
    namespace,
} from 'vuex-class';
const CommonVuex = namespace('common');
@Component({
    name: '',
    components: {},
})
export default class  extends Vue {
    // 判断是否收藏--状态
    private isCollect = true;
    // 分类数据
    private shopClassList = [];

    // 获取商家id
    @CommonVuex.State('mid') private mid!: string;

    // 获取分类数据
    private getShopClass() {
        let that = this;
        let data = {
            member_id: 36209, // this.mid,
        };
        getShopClass(data).then((res: any) => {
            that.shopClassList = res.data.data;
            console.log(res.data.data);
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
.cate{ 
    background:#f5f5f5;
    .header {
        position: relative;
        .header_inner {
            display: block;
            padding-top: 0.8rem;
            .shop_profil {
                padding-left: 2.7rem;
                .logo_img {
                    position: absolute;
                    left: 0.6rem;
                    top: 0.8rem;
                    width: 1.85rem;
                    height: 1.85rem;
                    border-radius: 0.3rem;
                }
                .name {
                    font-size: 0.8rem;
                    font-weight: 500;
                    line-height: 0.75rem;
                }
                .name_none {
                    color: rgba(0, 0, 0, 1);
                }
                .name_bg {
                    color: rgba(255, 255, 255, 1);
                }
                .start_dark {
                    margin-top: 0.1rem;
                    .start {
                        padding: 0.15rem 0.18rem;
                        width: 1.38rem;
                        height: 0.35rem;
                        background: rgba(255, 244, 244, 1);
                        border-radius: 0.13rem;
                        font-size: 0.35rem;
                        font-weight: 400;
                        color: rgba(232, 60, 60, 1);
                        line-height: 0.35rem;
                    }
                    .scope {
                        height: 0.4rem;
                        margin-top: 0.1rem;
                        .scope_num {
                            font-size: 0.45rem;
                            font-weight: 400;
                            color: rgba(161, 161, 161, 1);
                            line-height: 0.35rem;
                            text-shadow: 0 0 0.08rem rgba(0, 0, 0, 0.2);
                        }
                    }
                }
            }

            .follow_panel {
                position: absolute;
                right: 0.6rem;
                top: 1.08rem;
                width: 2.5rem;
                padding: 0.38rem 0.5rem;
                border-radius: 0.6rem;
                font-size: 0.6rem;
                font-weight: 500;
                line-height: 0.5rem;
                text-align: center;
                &.panel_none {
                    border: 0.01rem solid rgba(252, 97, 55, 1);
                    color: rgba(252, 97, 55, 1);
                }
                &.panel_bg {
                    border: 0.01rem solid rgba(255, 255, 255, 1);
                    color: rgba(255, 255, 255, 1);
                }
                .iconfont {
                    font-size: 0.65rem;
                }
            }
        }
    }
    .content{
        padding: 0 0.5rem;
        margin-top: 0.8rem;
        .search{
            width:100%;
            padding: 0 0.1rem;
            height:1.5rem;
            background:rgba(255,255,255,1);
            border:1px solid rgba(240,240,240,1);
            border-radius:0.75rem;
            .iconfont{
                font-size: 0.7rem;
                margin-left: 0.6rem;
                color:rgba(137,137,137,1);
            }
            .text{
                height:0.6rem;
                margin-left: 0.5rem;
                font-size:0.6rem;
                font-family:PingFang SC;
                font-weight:500;
                color:rgba(137,137,137,1);
                line-height:1.5rem;
            }
        }
        .shop_class{
            margin-top: 1rem;
            .all_shop{
                position: relative;
                height: 46px;
                background: #fff;
                border-radius:13px;
                .line{
                    position: absolute;
                    top: 18px;
                    left: 0.6rem;
                    width: 3px;
                    height: 11px;
                    background: #FF522A;
                }
                .text{
                    height:0.8px;
                    margin-left: 1.2rem;
                    font-size:0.8px;
                    font-family:PingFang SC;
                    font-weight:500;
                    color:rgba(51,51,51,1);
                    line-height: 46px;
                }
                .iconfont{
                    position: absolute;
                    right: 0.6rem;
                    color: #898989;
                    font-size: 12px;
                    line-height: 46px;
                }
            }
            .shop_list{
                margin-top: .5rem;
                background: #fff;
                border-radius:13px;
                .title{
                    position: relative;
                    height: 46px;
                    .line{
                        position: absolute;
                        top: 18px;
                        left: 0.6rem;
                        width: 3px;
                        height: 11px;
                        background: #FF522A;
                    }
                    .text{
                        height:0.8px;
                        margin-left: 1.2rem;
                        font-size:0.8px;
                        font-family:PingFang SC;
                        font-weight:500;
                        color:rgba(51,51,51,1);
                        line-height: 46px;
                    }
                    .iconfont{
                        position: absolute;
                        right: 0.6rem;
                        color: #898989;
                        font-size: 12px;
                        line-height: 46px;
                    }
                }
                .shop{
                    padding: 0 0.7rem 11px 0.7rem;
                    .list{
                        display: inline-block;
                        margin-bottom: 5px;
                        width: 10rem;
                        height: 1.9rem;
                        background: rgba(246,247,249,1);
                        border-radius: 3px;
                        .name{
                            font-size: 12px;
                            margin-left: .5rem;
                            font-family: PingFang SC;
                            font-weight: 500;
                            color: rgba(51,51,51,1);
                            line-height: 1.9rem;
                        }
                    }
                }
            }
        }
    }
}
</style>