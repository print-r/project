<template>
    <div class="product" style="font-size:1px;">
        <div class="nav-wrap">
            <div class="nav"
            v-for="(item, index) in sorts"
            :key="index">
                <div :class="[index==active?'active':'', 'name']" @click="handleGetProductSortData(index,item)" >
                    <span class="text">{{item.name}}</span>
                    <span class="icon" v-if="item.sort">
                        <i class="iconfont" :class="item[item.sort]"></i>
                    </span>
                </div> 
            </div>
        </div>
        <ul class="product-wrap clear">
            <ul class="left fl">
                <li class="list-wrap fl" 
                v-for="(item, key) in goodsListLeft"
                :key="key">
                    <img :src="item.pic" alt="">
                    <p class="name">{{item.NAME}}</p>
                    <p class="price"><span style="font-size:14px">￥</span>{{item.SALE_PRICE}}</p>
                </li>
            </ul>
            <ul class="right fr">
                <li class="list-wrap fr" 
                v-for="(item, key) in goodsListRight"
                :key="key">
                    <img :src="item.pic" alt="">
                    <p class="name">{{item.NAME}}</p>
                    <p class="price"><span style="font-size:14px">￥</span>{{item.SALE_PRICE}}</p>
                </li>
            </ul>
            <!-- <div v-loading="loading" class='loading'></div> -->
        </ul>
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
import { getProductData } from '@/api/product';
interface SortsParams {
    name: string;
    sort?: string;
    desc?: string;
    asc?: string;
}
const CommonVuex = namespace('common');
@Component
export default class  extends Vue {
    // 预览状态
    @Prop({
        type: Boolean,
        default: false,
    }) private isPreview!: boolean;
    
    // 获取商家id
    @CommonVuex.State('mid') private mid!: string;

    // 自定义，初始active位置
    private active = 0;  
    // 当前页数
    private currentPage = 0;  
    // 总页数
    private pageCount = 0;

    // 导航栏数据
    private sorts: SortsParams[] = [
        {
            name: '综合',
        },
        {
            name: '销量',
            sort: 'desc',
            desc: 'icon-downarrow',
            asc: 'icon-uparrow',
        },
        {
            name: '价格',
            sort: 'desc',
            desc: 'icon-downarrow',
            asc: 'icon-uparrow',
        },
    ];
    // 商品数据
    private goodsList = [];
    // 商品数据-左
    private goodsListLeft = [];
    // 商品数据-右
    private goodsListRight = [];
    
    private loading = false;


    // 获取商品排序数据
    private handleGetProductSortData(index: number, item: SortsParams): void {
        if (index === 0 && this.active === index) {
            return;
        }
        this.active = index;
        // 排它
        this.sorts.forEach((val: SortsParams, key: number) => {
            if (val.sort && key !== index) {
                val.sort = 'desc';
            }
        });
        if (item.sort) {
            this.sorts[index].sort = item.sort === 'asc' ? 'desc' : 'asc';
        }
        this.currentPage = 0;
        this.goodsListLeft = [];
        this.goodsListRight = [];
        this.getProductData();
    }

    // 获取商品数据
    private getProductData() {
        let that = this;
        let index = that.active ? that.active : 0;
        let sortType = that.sorts[index].sort === 'asc' ? 'asc' : 'desc';
        let data = {
            name: '',
            type: index,
            sort: sortType,
            pageIndex: that.currentPage,
            member_id: this.mid,
        };
        getProductData(data).then((res: any) => {
            that.goodsList = res.data.data;
            that.goodsList.forEach((item, i) => {
                try {
                    if (i > 3 && !this.isPreview) {
                        throw Error;
                    }
                    if (i % 2 === 0) {
                        that.goodsListLeft.push(item); 
                    } else {
                        that.goodsListRight.push(item); 
                    }
                } catch (e) {}
            });
            // 数据保存 本地
            localStorage.setItem('goodsList', JSON.stringify(res.data.data));
            that.pageCount =  res.data.pageCount;
        });
        
    }

    // 生命周期 - 创建之前
    private beforeCreate() {}

    // 生命周期 - 创建完成
    private created() {}

    // 生命周期 - 挂载之前
    private beforeMount() {}

    // 生命周期 - 挂载完成
    private mounted() {
        let that = this;
        // 初始化所有商品数据
        this.getProductData();
        
        // 判断预览状态 -- 有加载更多请求
        if (this.isPreview) {
            this.$nextTick(() => {
                // 预览时 加载更多
                if (document.querySelector('.preview_render')) {
                    let queryRender: any = document.querySelector('.preview_render') ;
                    queryRender.addEventListener('scroll', function(this: HTMLElement) {
                        // 屏幕可视高度
                        let clientHeight = this.clientHeight;
                        let scrollTop = this.scrollTop;
                        let scrollHeight = this.scrollHeight;
                        console.log('后台');
                        console.log(clientHeight, scrollTop, scrollHeight);
                        if ((clientHeight + scrollTop) === scrollHeight) {
                            if (that.currentPage < that.pageCount) {
                                that.loading =  false;
                                that.currentPage++;
                                that.getProductData();
                            }
                        }
                    });
                
                } else {
                    //  h5页面 -- 加载更多
                    window.onscroll = function() {
                        // console.log('web');
                        // 变量scrollTop是滚动条滚动时，距离顶部的距离
                        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop; 
                        // 变量windowHeight是可视区的高度
                        let windowHeight = document.documentElement.clientHeight || document.body.clientHeight; 
                        // 变量scrollHeight是滚动条的总高度
                        let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
                        // 滚动条到底部的条件
                        if ((scrollTop + windowHeight) === scrollHeight) {        
                            // 已滚动底部
                            if (that.currentPage < that.pageCount) {

                                that.currentPage++;
                                that.getProductData();
                            }
                            
                        }
                    };
                    
                }
            });   
                
        } else {
            // 查询本地是否 有商品数据
            // let goodsListLocal: any = localStorage.getItem('goodsList');
            // let goodsListData: any = JSON.parse(goodsListLocal);
            // // 非预览状态--无分页请求，并且无需一直请求
            // goodsListData.forEach((data: never, i: number) => {
            //     try {
            //         if (i > 3 && !this.isPreview) {
            //             throw Error;
            //         }
            //         if (i % 2 === 0) {
            //             that.goodsListLeft.push(data); 
            //         } else {
            //             that.goodsListRight.push(data); 
            //         }
            //     } catch (e) {}
            // });
        }
    }

    // 生命周期 - 更新之前
    private beforeUpdate() {}

    // 生命周期 - 更新完成
    private updated() {}

    // 生命周期 - 销毁之前
    private beforeDestroy() {}

    // 生命周期 - 销毁完成
    private destroyed() {}

    // 使用keep-alive缓存进入页面触发
    private activated() {}

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
@import '../style/product.scss';
</style>