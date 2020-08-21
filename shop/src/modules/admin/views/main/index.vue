<template>
    <div>
        <top></top>
        <div class="container">
            <div class="aside">
                <aside-list></aside-list>
            </div>
            <div class="section">
                <router-view></router-view>
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
import {
    namespace,
} from 'vuex-class';
import top from '@/components/header/header.vue';
import asideList from '@/components/aside/aside.vue';
import { MenuOption } from '@/types/menu';
import { IAddParams } from '@/modules/admin/store/shop/mutations';
import { IMenuInitParams } from '@/modules/admin/store/menu/mutations';
import { getShop } from '@/api/shop';
import { unload } from '@/utils/common';

const CommonVuex = namespace('common');
const MenuVuex = namespace('menu');
@Component({
    name: 'Main',
    components: {
        top,
        asideList,
    },
})
export default class Main extends Vue {

    // 页面数据改变状态
    @CommonVuex.State('isEdit') private isEdit!: boolean;

    // 保存商家id
    @CommonVuex.Mutation('handleSaveMid')
    private handleSaveMid!: (id: string) => void;

    // 保存当前端
    @CommonVuex.Mutation('handleSaveCurrentMode')
    private handleSaveCurrentMode!: (mode: string) => void;

    // 初始化组件数据
    @MenuVuex.Mutation('handleInitMenu')
    private handleInitMenu!: (params?: IMenuInitParams) => void;

    // 深监听 immediate: true
    @Watch('$route', { deep: true })
    private changeRouter(newVal: any, oldVal: any): void {
        this.$nextTick(() => {
            this.init();
        });
    }

    // 监听页面数据是否发生改变
    @Watch('isEdit')
    private changeEditStatus(newVal: any, oldVal: any): void {
        let mode = newVal ? 'addEventListener' : 'removeEventListener';
        (window as any)[mode]('beforeunload', unload, false);
    }

    // 初始化
    private init(): void {
        // 当前端
        let mode = this.$route.name as string;
        // 保存当前端
        this.handleSaveCurrentMode(mode);
        getShop({
            mapStr: JSON.stringify({
                shop_ID: 6,
            }),
        }).then( (res: any) => {
            let data = JSON.parse(res.data[`${mode}_template`]);
            let thmem = res.data[`${mode}_templateID`];
            // 初始化模块
            this.handleInitMenu({
                data,
                thmem,
            });
        });
    }

    // em基准值
    private handleSetBaseEm(): void {
        let baseEm = 0;
        if (document.body.clientWidth > 1920) {
            baseEm = 33;
        } else if (document.body.clientWidth === 1920) {
            baseEm = 28;
        } else if (document.body.clientWidth < 1920 && document.body.clientWidth >= 1600) {
            baseEm = 24;
        } else if (document.body.clientWidth < 1600) {
            baseEm = 22;
        }
        document.body.style.fontSize = baseEm + 'px';
    }

    // 生命周期 - 创建之前
    private beforeCreate(): void {}

    // 生命周期 - 创建完成
    private created(): void {}

    // 生命周期 - 挂载之前
    private beforeMount(): void {}

    // 生命周期 - 挂载完成
    private mounted(): void {
        let id = this.$getUrlParams('mid') as string || '';
        if (!id) {
            this.$message.error('参数有误，3秒后跳转');
            setTimeout(() => {
                window.history.go(-1);
            }, 3000);
            return;
        }
        const setBaseEm = this.$debounce(this.handleSetBaseEm);
        // 自执行一次
        setBaseEm();
        // 添加 resize 绑定事件
        window.addEventListener('resize', () => {
            setBaseEm();
        }, false);
        // 保存商家id
        this.handleSaveMid(id);
        // 初始化
        this.init();
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