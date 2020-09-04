<template>
    <div class="product" >
        <div :class="[isFix == 0 ? '': 'nav_fix_search', 'nav-wrap']">
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
        <ul class="clear" :class="[isFix == 0 ? '': 'product_fix_search', 'product-wrap']">
            <div v-if="goodsList.length == 0" class="null_product">
                <img class="img" src="//cdn.dusun.com.cn/20/wx_microapp/red/pic_result.png" alt="">
                <p class="tit">抱歉，未搜索到相关商品</p>
            </div>
            <ul class="left fl">
                <li class="list-wrap fl" 
                v-for="(item, key) in goodsListLeft"
                :key="key"
                @click="handleJumpUrl(item.id)">
                    <img :src="item.pic" alt="">
                    <p class="name">{{item.NAME}}</p>
                    <p class="price"><span style="font-size:14px">￥</span>{{item.SALE_PRICE}}</p>
                </li>
            </ul>
            <ul class="right fr">
                <li class="list-wrap fr" 
                v-for="(item, key) in goodsListRight"
                :key="key"
                @click="handleJumpUrl(item.id)">
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

    // 搜索name
    @Prop({
        type: String,
        default: false,
    }) private searchWord!: string;

    // 是否固定位置 0:首页； 1：商品搜索页
    @Prop({
        type: Number,
        default: 0,
    }) private isFix!: number;

    // 分类id
    @Prop({
        type: String,
        default: '',
    }) private cateId!: string;

    // 获取商家id
    @CommonVuex.State('mid') private mid!: string;

     // 保存商家id
    @CommonVuex.Mutation('handleSaveMid') 
    private handleSaveMid!: (mid: string) => void;
    
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

    // 商品跳转
    private handleJumpUrl(id: any) {
        let cateUrl = `https://www.dusun.com.cn/ds-${id}.html`;
        window.open(cateUrl);
    }

    
    // 数据监听
    @Watch('searchWord')
    private searchWordChange(newVal: string, oldVal: string): void {
        this.searchWord = newVal;
        // 清空数据
        this.currentPage = 0;
        this.goodsListLeft = [];
        this.goodsListRight = [];
        this.cateId = '';
        // 初始化所有商品数据
        this.getProductData();
    }


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
            name: this.searchWord,
            cate_id: this.cateId,
            type: index,
            sort: sortType,
            pageIndex: that.currentPage,
            member_id: that.mid,
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
            if (!sessionStorage.getItem('productStorage')) {
                // 数据保存 本地
                sessionStorage.setItem('productStorage', JSON.stringify({
                    data: res.data.data,
                    total: res.data.pageCount * 12,
                }));
            }
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
        // 保存商家id
        let params: any = this.$getUrlParams(['mid', 'shop_id']);
        this.handleSaveMid(params.mid);
        // 判断预览状态 -- 有加载更多请求
        if (this.isPreview) {
            // 初始化所有商品数据
            this.getProductData();
            this.$nextTick(() => {
                // 预览时 加载更多
                if (document.querySelector('.preview_render')) {
                    let queryRender: any = document.querySelector('.preview_render') ;
                    queryRender.addEventListener('scroll', function(this: HTMLElement) {
                        // 屏幕可视高度
                        let clientHeight = this.clientHeight;
                        let scrollTop = this.scrollTop;
                        let scrollHeight = this.scrollHeight;
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
            // 本地缓存商品数据
            let data = sessionStorage.getItem('productStorage') && JSON.parse(sessionStorage.getItem('productStorage') as string);
            if (data) {
                this.goodsList = data.data;
                data.data.forEach((v: never, k: number) => {
                    if (k < 4) {
                        if (k % 2 === 0) {
                            this.goodsListLeft.push(v); 
                        } else {
                            this.goodsListRight.push(v); 
                        }
                    }
                });
            } else {
                // 初始化所有商品数据
                this.getProductData();
            }
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