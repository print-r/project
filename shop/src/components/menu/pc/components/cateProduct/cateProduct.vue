<template>
    <div class="product layout">
        <div class="aside_cate">
            <div class="aside_content">
                 <div class="cate_title">
                    <span>商品分类</span>
                </div>
                <div class="cate list_container">
                    <ul class="cate_list">
                        <li class="cate_row" v-for="(row, index) in shopClassList" :key="index">
                            <div class="cate_name" @click="handleOpenCateItem(index)">
                                <span>{{row.NAME}}</span>
                                <i class="iconfont icon-you1" :class="{cate_rotate:cateActive == index}"></i>
                            </div>
                            <ul class="cate_item">
                                <li v-for="(val, key) in row.threeClassPC" :key="key" @click="handleGetCateProductData(key)" :class="{current: cateChildActive == key && cateParentActive == index}">
                                    <span>{{val.NAME}}</span>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="section">
            <div class="top">
                <div class="left">
                    <ul class="sorts">
                        <li :class="{current:index == active}" v-for="(item,index) in sorts" :key="index" @click="handleGetProductSortData(index,item)">
                            <span class="text">{{item.name}}</span>
                            <span class="icon" v-if="item.sort">
                                <i class="iconfont" :class="item[item.sort]"></i>
                            </span>
                        </li>
                    </ul>
                    <div class="search_input">
                        <span class="icon">
                            <i class="iconfont icon-sousuo2"></i>
                        </span>
                        <input type="text" placeholder="本店搜索" id="search" ref="search_input" v-model="keyword" @input="handleKeywordChange" >
                    </div>
                </div>
                <div class="right">
                    <span class="page_size">{{currentPage}}/{{total/pageSize}}</span>
                    <div class="btns iconfont">
                        <div :class="[currentPage===1 ? 'disabled' : '', 'prev']" @click="handlePrevPage">
                            <i class="icon-zuobian"></i>
                        </div>
                        <div :class="[currentPage===total/pageSize ? 'disabled' : '', 'next']" @click="handleNextPage">
                            <i class="icon-you1" ></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content">
                <ul class="product_list">
                    <li v-for="(item,index) in list" :key="index">
                        <a href="#">
                            <div class="product_img">
                                <img v-lazy="item.pic" alt="">
                            </div>
                            <div class="product_name">
                                <span>{{item.NAME}}</span>
                            </div>
                            <div class="price">
                                ￥{{item.SALE_PRICE}}
                            </div>
                        </a>
                    </li>
                </ul>
                <div class="pagination">
                    <el-pagination
                    :current-page.sync="currentPage"
                    :page-size="pageSize"
                    :pageCount="7"
                    :hide-on-single-page="true"
                    :total="total"
                    @current-change="handleCurrentChange" 
                    layout="prev, pager, next, jumper, slot"
                    >
                    <span class="fix">
                        <span>确定</span>
                    </span>
                    </el-pagination>
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
import { MenuFindData } from '@/types/menu';
import { getProductData } from '@/api/product';
import { getShopClass } from '@/api/cate';
import { Debounce } from '@/utils/common';
interface SortsParams {
    name: string;
    sort?: string;
    desc?: string;
    asc?: string;
}
import {
    namespace,
} from 'vuex-class';
const CommonVuex = namespace('common');
@Component
export default class  extends Vue {
    
    // 获取商家id
    @CommonVuex.State('mid') private mid!: string;

    // 排序数据
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

    // 默认选中排序
    private active = 0;

    // 商品数据
    private list: any = [];

    // 当前页
    private page = 1;

    // 每页显示的数量   
    private pageSize = 12;

    // 当前页数
    private currentPage = 0;

    // 总数
    private total = 0;

    // 关键字
    private keyword = '';
    
    // 分类数据
    private shopClassList: any[] = [];

    // 当前分类id
    private cateId = '';

    // 选中的分类
    private cateActive = -1;

    // 选中父分类
    private cateParentActive = -1;

    // 选中的子分类
    private cateChildActive = -1;

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
        this.currentPage = 1;
        this.getProductData();
    }
    
    // 当前页码
	private handleCurrentChange(page: number) {
        this.getProductData();
    }

    // 关键字搜索
    @Debounce()
    private handleKeywordChange(value: string) {
        if (this.keyword === (this.$refs.search_input as HTMLInputElement).value) {
            this.active = 0;
            this.currentPage = 1;
            this.getProductData();
        }
    }

    // 上一页
    private handlePrevPage() {
        if (this.currentPage > 1) {
            this.currentPage = this.currentPage - 1;
            this.getProductData();
        }
        
    }
    // 下一页 
    private handleNextPage() {
        if (this.currentPage < (this.total / this.pageSize)) {
            this.currentPage = this.currentPage + 1;
            this.getProductData();
        }
    }

    // 获取商品数据
    private getProductData() {
        let that = this;
        let index = that.active ? that.active : 0;
        let sortType = that.sorts[index].sort === 'asc' ? 'asc' : 'desc';
        let currentPage = that.currentPage - 1;
        let data = {
            name: that.keyword,
            cate_id: this.cateId,
            type: index,
            sort: sortType,
            pageIndex: currentPage,
            member_id: this.mid,
        };
        getProductData(data).then((res: any) => {
            that.list = res.data.data;
            that.total = res.data.pageCount * that.pageSize;
        });
        
    }
    
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

    // 获取分类商品数据
    private handleGetCateProductData(index: number): void {
        if (this.cateChildActive === index && this.cateParentActive === this.cateActive ) {
            return;
        }
        // 默认排序
        this.active = 0;
        // 排它
        this.sorts.forEach((val: SortsParams, key: number) => {
            if (val.sort && key !== index) {
                val.sort = 'desc';
            }
        });
        // 重置页码
        this.currentPage = 1;
        // 分类id
        this.cateId = this.shopClassList[this.cateActive].threeClassPC[index].ID;
        // 获取数据
        this.getProductData();
        // 选中的分类   
        this.cateParentActive = this.cateActive;
        this.cateChildActive = index;
    }

    // 显示分类
    private handleOpenCateItem(index: number): void {
        let cateList = (document.querySelector('.cate_item') as HTMLElement).children;
        // 关闭上一个分类
        if (this.cateActive !== -1) {
            $('.cate_item').eq(this.cateActive).animate({ 
                height: 0,
            }, 300);
        }
        // 显示当前分类
        if (this.cateActive !== index) {
             $('.cate_item').eq(index).animate({ 
                height: (cateList[0].clientHeight * this.shopClassList[index].threeClassPC.length) + 'px',
            }, 300);
        } else {
            index = -1;
        }
        this.cateActive = index;
    }

    // 重置分类高度
    private handleResetCateHeight(): void {
        if (this.cateActive === -1) {
            return;
        }
        let height = $('.cate_item').eq(this.cateActive).children().eq(0).outerHeight();
        $('.cate_item').eq(this.cateActive).css('height', this.shopClassList[this.cateActive].threeClassPC.length * height);
    }
    
    // 生命周期 - 创建之前
    private beforeCreate() {}

    // 生命周期 - 创建完成
    private created() {}

    // 生命周期 - 挂载之前
    private beforeMount() {}
    
    // 生命周期 - 挂载完成
    private mounted() {
        // 初始化分类数据
        this.getShopClass();
        // 初始化所有商品数据
        this.getProductData();
        const resetCateHeight = this.$debounce(this.handleResetCateHeight);
        window.addEventListener('resize', () => {
            resetCateHeight();
        });
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
@import './style/cateProduct.scss';
</style>

<style lang="scss">

.pagination
{
    .active
    {
        cursor: not-allowed !important;
    }
    .el-icon-more
    {
        display: none !important;
    }
}

</style>
