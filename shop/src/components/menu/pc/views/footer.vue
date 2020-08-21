<template>
    <div class="footer">
        <div class="content layout">
            <div class="servece">
                <label>
                    <img :src="getImgUrl('tag_a.png')" alt="">
                </label>
                <label>
                    <img :src="getImgUrl('tag_b.png')" alt="">
                </label>
                <label>
                    <img :src="getImgUrl('tag_c.png')" alt="">
                </label>
                <label>
                    <img :src="getImgUrl('tag_d.png')" alt="">
                </label>
            </div>
            <div class="line_swipper">
                <div class="line clear">
                    <div class="table_responsive fl">
                        <ul class="nav_sitemap">
                            <li class="li1">
                                <ul>
                                    <li><a><b>推荐服务</b> </a></li>
                                    <li><a target="_blank" rel="nofollow" @click="jumpHref('1789', '0')">推荐说明</a></li>
                                    <li><a target="_blank" rel="nofollow" @click="jumpHref('1785', '0')">分享说明</a></li>
                                    <li><a target="_blank" rel="nofollow" @click="jumpHref('1786', '0')">提现说明</a></li>
                                    <li><a target="_blank" rel="nofollow" @click="jumpHref('1787', '0')">返利说明</a></li>
                                </ul>
                            </li>
                            <li class="li1">

                                <ul>
                                    <li><a><b>账户管理</b> </a></li>
                                    <li><a target="_blank" rel="nofollow" @click="jumpHref('1778', '0')">账户注册</a></li>
                                    <li><a target="_blank" rel="nofollow" @click="jumpHref('1782', '0')">找回密码</a></li>
                                    <li><a target="_blank" rel="nofollow" @click="jumpHref('1783', '0')">用户登录</a></li>
                                    <li><a target="_blank" rel="nofollow" @click="jumpHref('1784', '0')">订单查询</a></li>
                                </ul>
                            </li>
                            <li class="li1">

                                <ul>
                                    <li><a><b>购物流程</b> </a></li>
                                    <li><a target="_blank" rel="nofollow" @click="jumpHref('1774', '0')">服务条款</a></li>
                                    <li><a target="_blank" rel="nofollow" @click="jumpHref('1775', '0')">购物流程</a></li>
                                    <li><a target="_blank" rel="nofollow" @click="jumpHref('1776', '0')">会员制度</a></li>
                                    <li><a target="_blank" rel="nofollow" @click="jumpHref('1777', '0')">会员免费送</a></li>
                                    <li><a target="_blank" rel="nofollow" @click="jumpHref('1778', '0')">物流配送</a></li>
                                </ul>
                            </li>
                            <li class="li1">

                                <ul>
                                    <li><a><b>支付方式</b> </a></li>
                                    <li><a target="_blank" rel="nofollow" @click="jumpHref('1772', '0')">在线支付</a></li>
                                    <li><a target="_blank" rel="nofollow" @click="jumpHref('1773', '0')">常见支付问题</a></li>
                                </ul>
                            </li>
                            <li class="li1">
                                <ul>
                                    <li><a><b>售后服务</b> </a></li>
                                    <li><a target="_blank" rel="nofollow" @click="jumpHref('1768', '0')">服务说明</a></li>
                                    <li><a target="_blank" rel="nofollow" @click="jumpHref('1769', '0')">退换货政策</a></li>
                                    <li><a target="_blank" rel="nofollow" @click="jumpHref('1770', '0')">退换货流程</a></li>
                                    <li><a target="_blank" rel="nofollow" @click="jumpHref('1771', '0')">退款说明</a></li>
                                </ul>
                            </li>
                            <li class="li1">
                                <ul>
                                    <li><a><b>关于我们</b> </a></li>
                                    <li><a target="_blank" rel="nofollow" @click="jumpHref('1764', '0')">公司介绍</a></li>
                                    <li><a target="_blank" rel="nofollow" @click="jumpHref('1765', '0')">企业文化</a></li>
                                    <li><a target="_blank" rel="nofollow" @click="jumpHref('1766', '0')">诚聘英才</a></li>
                                    <li><a target="_blank" rel="nofollow" @click="jumpHref('1767', '0')">联系我们</a></li>
                                </ul>
                            </li>
                        </ul>
                    
                    </div>
                    <div class="code_list fl">
                        <div class="code_phone">
                            <p>客服电话: </p>
                            <p><strong class="text-big">020-36079368(9:00-21:00)</strong></p>
                        </div>

                        <div class="code_x">
                            <!-- <div class="media-body"> -->
                            <img :src="getImgUrl('ewm.jpg')" style="width: 280px">
                            <!-- </div> -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="link_swipper">
                <div class="links">
                    <span class="links-tit">友情链接：</span>
                    <span class="bor-r"><a @click="jumpHref('http://www.vemte.com/', '1')" target="_blank">减速电机</a></span>
                    <span class="bor-r"><a @click="jumpHref('https://www.meidebi.com/haitao/', '1')" target="_blank">海淘</a></span>
                    <span class="bor-r"><a @click="jumpHref('http://www.cn-im.cn/', '1')" target="_blank">机器人</a></span>
                    <span class="bor-r"><a @click="jumpHref('http://www.sz1981.com/', '1')" target="_blank">亚马逊培训</a></span>
                    <span class="bor-r"><a @click="jumpHref('http://www.ecook.cn/', '1')" target="_blank">家常菜</a></span>
                    <span class="bor-r"><a @click="jumpHref('http://www.xzdw.cn/', '1')" target="_blank">b超机</a></span>
                    <span class="bor-r"><a @click="jumpHref('https://www.fanquanwang.com/', '1')" target="_blank">优惠券</a></span>
                    <span class="bor-r"><a @click="jumpHref('http://www.de-ele.com/', '1')" target="_blank">德力西</a></span>
                    <span class="bor-r"><a @click="jumpHref('https://www.uguu.com/', '1')" target="_blank">货到付款</a></span>
                    <span><a href="">淘宝优惠券</a></span>
                </div>
            </div>
            <div class="detail_swipper">
                <div class="ds">
                    Copyright ©2014-2019 dusun.com.cn, All
                    Rights Reserved 粤ICP备14060996号-1 | 广州市房企网络科技有限公司版权所有
                </div>
                <div class="ds" >
                    增值电信业务经营许可证:
                    <span @click="jumpImg('http://www.dusun.com.cn/form/newIndex/image/房企网络增值电信业务经营许可证.png')">粤B1-20150458</span>
                    | <span @click="jumpImg('http://www.dusun.com.cn/form/index/images/food.jpg')">食品经营许可证</span> 
                    | <span @click="jumpImg('http://www.dusun.com.cn/form/index/images/yinye.jpg')">营业执照</span>
                </div>
                <div class="ds" style="padding: 0px;">
                    服务热线：020-36079368 公司地址：广州市越秀区广园西路岗头大街9号316
                    <p>
                        <span @click="jumpHref('http://www.dusun.com.cn/class-group.html', '1')">网站地图</span> 
                        <span @click="jumpHref('http://www.dusun.com.cn/brand-group.html', '1')">品牌大全</span> 
                        <span @click="jumpHref('http://www.dusun.com.cn/dusun_index.do?isPc=n', '1')">手机端</span> 
                        <span @click="jumpHref('https://cpy.dusun.com.cn/', '1')">商户入口</span> 
                        <span id="cnzz_stat_icon_1254904638"> 
                            <span href="http://www.cnzz.com/stat/website.php?web_id=1254904638" target="_blank" title="站长统计"> 
                                <img border="0" hspace="0" vspace="0" src="https://icon.cnzz.com/img/pic.gif"> 
                            </span> 
                        </span>
                    </p>
                </div>
            </div>
            <div class="end">
                <!-- 诚信认证代码 -->
                <a id="___szfw_logo___" @click="jumpHref('https://credit.szfw.org/CX20151023011785850181.html', '1')" target="_blank">
                    <img :src="getImgUrl('cxdanwei.png')" border="0">
                </a>
                <!-- <script type="text/javascript">(function(){document.getElementById('___szfw_logo___').oncontextmenu = function(){return false;}})();</script> -->
                <!-- 行业品牌证书 -->
                <a id="_xinchacharenzheng_cert_vip_hangyecn" style="text-decoration:none;" target="_blank"  
                @click="jumpHref('https://xyt.xinchacha.com/pcinfo?sn=448049840954413056&amp;certType=3', '1')"> 
                    <img src="https://xyt.xinchacha.com/img/icon/icon2.png"> 
                </a>
                <!-- 可信网站 -->
                <a @click="jumpHref('https://ss.knet.cn/verifyseal.dll?sn=e15102944010061201oeyw000000&amp;ct=df&amp;a=1&amp;pa=0.8335358768235892', '1')" target="_blank">
                    <img :src="getImgUrl('end_c.png')" alt="">
                </a>
                <!-- 实名认证 -->
                <a id="_pingansec_bottomimagesmall_shiming" 
                @click="jumpHref('//si.trustutn.org/info?sn=812161011024708504596&amp;certType=1', '1')">
                    <img src="//v.trustutn.org/images/cert/bottom_small_img.png">
                </a>
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

    // 获取图片地址
    private getImgUrl(imgIcon: string) {
        let imgUrl = 'http://www.dusun.com.cn/form/newIndex/image/' + imgIcon;
        return imgUrl;
    }

    // 跳转外部链接 -- 图片
    private jumpImg(url: string) {
        window.location.href = url;
    }

    // 跳转外部链接 -- 链接
    private jumpHref(url: string, type: string) {
        if (type === '0') {
            url = 'http://www.dusun.com.cn/article/' + url + '.html';
        }
        window.location.href = url;
    }

    // 生命周期 - 创建之前
    private beforeCreate(): void {}

    // 生命周期 - 创建完成
    private created(): void {}

    // 生命周期 - 挂载之前
    private beforeMount(): void {}

    // 生命周期 - 挂载完成
    private mounted(): void {}

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