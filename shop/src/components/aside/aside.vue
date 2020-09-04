<template>
    <div class="aside_list">
        <div class="item">
            <div class="title">
                <span>选择主题</span>
            </div>
            <ul class="menu">
                <li v-for="(item,index) in themeListData" :key="index">
                   <div class="row" :class="{active:index === defaultTheme}" @click="handleChangeTheme(index)">
                        <div class="img">
                            <img :src="item.img" alt="">
                        </div>
                        <div class="name">{{item.title}}</div>
                        <div class="radio">
                            <img :src="index === defaultTheme ? require('../../assets/images/frame_sel.png') : require('../../assets/images/frame.png') " />
                        </div>
                   </div>
                </li>
            </ul>
        </div>
        <div class="item sub">
            <div class="title">
                <span>选择组件</span>
            </div>
            <draggable :class="{disabled:dragStatus}" tag="ul" class="menu" v-model="menuList" v-bind="dragOptions" :clone="clone" :move="handleMove" @start="handleDragStart" @end="handleDragEnd">
                <li v-for="(item, key) in menuList" :key="key" :class="{forbid:item.exist >= item.max}">
                    <div class="row" :class="{active:item.exist}">
                        <div class="img">
                            <img :src="item.img" alt="">
                        </div>
                        <div class="text">{{item.name}}</div>
                        <div class="count">{{item.exist}}/{{item.max}}</div>
                    </div>
                </li>
            </draggable>
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
import draggable from 'vuedraggable';
import { MenuOption } from '@/types/menu';
import { ThemeOptions } from '@/types/theme';
import { IAddParams } from '@/modules/admin/store/shop/types';
const CommonVuex = namespace('common');
const MenuVuex = namespace('menu');
@Component({
    name: '',
    components: {
        draggable,
    },
})
export default class  extends Vue {

    // 拖拽状态
    @CommonVuex.State('dragStatus') private dragStatus!: boolean;
    
    // 当前端
    @CommonVuex.State('mode') private mode!: string;

    // 默认主题
    @CommonVuex.State('theme') private defaultTheme!: string;

    // 主题数据
    @CommonVuex.State('themeList') private themeList!: ThemeOptions;

    // 修改拖拽状态
    @CommonVuex.Mutation('handleEditDragStatus')
    private handleEditDragStatus!: (status: boolean) => void;

    // 切换主题
    @CommonVuex.Mutation('handleChangeTheme')
    private handleChangeThemeVuex!: (theme: string) => void;

    // 组件数据
    @MenuVuex.State('menu') private list!: MenuOption[];

    // 添加模块
    @MenuVuex.Mutation('handleAddMenu')
    private handleAddMenu!: (data: IAddParams) => void;

    // 主题数据
    private themeListData: ThemeOptions = {};

    // 当前选中数据
    private currentData = {} as MenuOption;

    @Watch('mode')
    private changeMode(newVal: string, oldVal: string) {
        let themeList: ThemeOptions = {};
        // 数据过滤
        Object.keys(this.themeList[newVal]).map((name: string) => {
            if (this.themeList[newVal][name].show) {
                themeList[name] = this.$deep(this.themeList[newVal][name]);
            }
        });
        this.themeListData = themeList;
    }

    // 拖拽配置参数
    private get dragOptions(): object {
        return {
            animation: 0,
            sort: false,
            group: {
                name: 'description',
                pull: 'clone',
            },
            // dragClass: 'dragClass', // 拖动时的样式
            // ghostClass: 'ghost',
        };
    }

    // 组件数据过滤
    private get menuList(): MenuOption[] {
        return this.list.filter( (item: MenuOption) => item.show);
    }

    // 切换主题
    private handleChangeTheme(index: string): void {
        if (this.defaultTheme !== index) {
            this.handleChangeThemeVuex(index);
        }
    }

    // 深拷贝对象
    private clone(data: MenuOption) {
        this.currentData = this.$deep(data);
    }

    // 移动
    private handleMove({ relatedContext, draggedContext }: any): boolean {
        const relatedElement = relatedContext.element;
        const draggedElement = draggedContext.element;
        return (
            (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
        );
    }

    // 开始拖拽
    private handleDragStart(evt: any): void {
        this.handleEditDragStatus(true);
        let item = this.menuList[evt.oldIndex];
        if (item.exist < item.max) {
            document.body.style.setProperty('--text', `'${item.name}'`);
        }
    }

    // 拖拽结束
    private handleDragEnd(evt: any): void {
        this.handleEditDragStatus(false);
        // 判断是否进入目标区域
        if (evt.pullMode && !evt.originalEvent.returnValue) {
            let data = {
                data: this.currentData,
                index: evt.newIndex,
            };
            // 保存数据
            this.handleAddMenu(data);
        }
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
@import './style/aside.scss';
</style>

<style>
    :root{
        --text: '';
    }
</style>