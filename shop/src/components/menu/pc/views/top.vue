<template>
    <div class="top">
        <header class="head layout">
            <div class="welcome">
                <span class="text">欢迎来到大尚国际！</span>
                <a href="#" class="sign">
                    <span>请登录</span>
                </a>
                <a href="#" class="register">
                    <span>注册有礼</span>
                    <img src="../../../../assets/images/icon_register.png" alt="">
                </a>
            </div>
            <div class="aside">
                <ul class="aside_ul">
                    <li>
                        <div class="item">
                            <a href="#">
                                <span>大尚国际</span>
                            </a>
                        </div>
                    </li>
                    <li>
                        <div class="item">
                            <span>个人中心</span>
                            <i class="iconfont icon-bottom"></i>
                        </div>
                        <div class="list">
                            <ul>
                                <li>
                                    <a href="#">我的订单</a>
                                </li>
                                <li>
                                    <a href="#">我的购物车</a>
                                </li>
                                <li>
                                    <a href="#">我的优惠劵</a>
                                </li>
                                <li>
                                    <a href="#">推荐中心</a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <div class="item">
                            <span>商家入驻</span>
                            <i class="iconfont icon-bottom"></i>
                        </div>
                        <div class="list">
                            <ul>
                                <li>
                                    <a href="#">商家入驻</a>
                                </li>
                                <li>
                                    <a href="#">商家后台</a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <div class="item">
                            <span>客服热线</span>
                            <i class="iconfont icon-bottom"></i>
                        </div>
                        <div class="list" :style="`width:${width}px;`">
                            <div class="tel"><span>(020)36070368（09:00-21:00）</span></div>
                        </div>
                    </li>
                    <li>
                        <div class="item">
                            <span>大尚国际APP</span>
                           <i class="iconfont icon-bottom"></i>
                        </div>
                        <div class="list" :style="`width:${width}px;left:-${left}px`">
                            <div class="imgs">
                                <img src="../../../../assets/images/an_app.png" alt="">
                                <img src="../../../../assets/images/apple_app.png" alt="">
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </header>
        <div class="logo">
            <div class="logo_content layout">
                <div class="left">
                    <div class="logo_img">
                        <img src="../../../../assets/images/dasun_logo.png" alt="">
                    </div>
                    <div class="shop_info">
                        <div class="shop_name">花妍丽化妆品专卖店</div>
                        <div class="shop_score">
                            <div class="auth">
                                <img src="../../../../assets/images/enterprise.png" alt="">
                            </div>
                            <div class="star iconfont">
                                <i class="icon-shoucangxingxing"></i>
                                <i class="icon-shoucangxingxing"></i>
                                <i class="icon-shoucangxingxing"></i>
                                <i class="icon-shoucangxingxing"></i>
                                <i class="icon-shoucangxingxing"></i>
                            </div>
                            <div class="score">
                               <span> 4.0</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <div class="search">
                        <div class="input">
                            <i class="iconfont icon-sousuo2"></i>
                            <input type="text" placeholder="请输入关键字">
                        </div>
                        <div class="search_btn">
                            <span>搜大尚</span>
                        </div>
                        
                    </div>
                    <div class="search_shop">
                        <span>搜本店</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="header_fixed" :class="{op:fixed}">
            <div class="fixed_content layout">
                <div class="fixed_logo">
                    <img src="../../../../assets/images/dasun_logo.png" alt="">
                </div>
                <div class="fixed_search">
                    <div class="f_search_input">
                        <div class="search">
                            <div class="input">
                                <i class="iconfont icon-sousuo2"></i>
                                <input type="text" placeholder="请输入关键字">
                            </div>
                            <div class="search_btn">
                                <span>搜大尚</span>
                            </div>
                            
                        </div>
                        <div class="search_shop">
                            <span>搜本店</span>
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
    Prop,
    Watch,
} from 'vue-property-decorator';
@Component
export default class  extends Vue {

    // 数据监听
    // @Watch('value')
    // private valueChange(newVal, oldVal): void {}

    private width = 0;

    private left = 0;

    // 固定导航
    private fixed = false;

    private handleSetPlace(): void {
        let lis: NodeListOf<HTMLElement> = document.querySelectorAll('.aside_ul > li');
        this.width =  lis[lis.length - 2].clientWidth + lis[lis.length - 1].clientWidth;
        this.left = this.width - lis[lis.length - 1].clientWidth + 2;
    }

    // 生命周期 - 创建之前
    private beforeCreate(): void {}

    // 生命周期 - 创建完成
    private created(): void {}

    // 生命周期 - 挂载之前
    private beforeMount(): void {}

    // 生命周期 - 挂载完成
    private mounted(): void {
        const vm = this;
        if (this.$route.name === 'Preview') {
            // 绑定滚动事件
            window.addEventListener('scroll', function() {
                let el = document.querySelector('.logo_content') as HTMLElement;
                if (this.scrollY >= el.offsetTop + el.clientHeight) {
                    vm.fixed = true;
                } else {
                    vm.fixed = false;
                }
            });
            const setPlace = this.$debounce(this.handleSetPlace);
            setPlace();
            window.addEventListener('resize', () => {
                setPlace();
            });
        }
        
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
@import '../style/top.scss';
</style>