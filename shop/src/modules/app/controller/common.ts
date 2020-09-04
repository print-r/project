import { Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { handleSetRem } from '@/utils/common';
const CommonVuex = namespace('common');
/**
 * 前台控制器
 */
export class CommonController extends Vue {
    // 商家ID
    protected mid = '';
    // 店铺ID
    protected shopId = '';

    // 保存商家ID
    @CommonVuex.Mutation('handleSaveMid')
    protected handleSaveMid!: (mid: string) => void;

    // 保存店铺ID
    @CommonVuex.Mutation('handleSaveShopId')
    protected handleSaveShopId!: (shopId: string) => void;

    // 构造函数
    constructor() {
        super();
        // 设置页面rem
        handleSetRem();
        // 验证URL参数
        this.handleCheckQuery();
    }

    // 验证路由参数
    private handleCheckQuery(): void {
        let params: any = this.$getUrlParams(['mid', 'shop_id']);
        if (!Boolean(params.mid) || !Boolean(params.shop_id)) {
            this.$message.error('参数有误，3秒后跳转');
            setTimeout(() => {
                window.history.go(-1);
            }, 3000);
            throw new Error('参数有误');
        } else {
            this.mid = params.mid;
            this.shopId = params.shop_id;
            // Vuex保存商家ID
            this.handleSaveMid(this.mid);
            // Vuex保存店铺ID
            this.handleSaveShopId(this.shopId);
        }
    }
}