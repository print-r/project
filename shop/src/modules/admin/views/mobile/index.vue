<template>
    <div class="mobile">
        <draggable  
            class="render_content" 
            :style="`width:${phoneSize[phone].width}px;min-height:${phoneSize[phone].height}px`" 
            v-model="list" v-bind="dragOptions"
            :move="handleMove"
            @update="handleUpdateMenu"
            @start="handleDragStart"
            @end="handleDragOver"
        >
            <div class="menu_item" v-for="(item,index) in list" :key="index" ref="menu_item">
                <!-- 选中框 -->
                <i class="place" :class="{active:index === editIndex}" @click.stop="handleEdit(index)"></i>
                <!-- 左侧文字 -->
                <i class="tips">
                    <span class="text">{{item.name}}</span>
                </i>
                <transition-group  :name="'flip-list'" tag="div">
                    <render :value="item" :mode="mode" :key="index"></render>
                </transition-group>
            </div>
        </draggable>
        <section>
            <!-- 右侧功能框 -->
            <div class="utils_list" v-for="(item,index) in list" :key="index" :style="`top:${top}px;left:${left}px;`" v-show="index === editIndex">
                <!-- 右侧功能框 -->
                <div class="handle">
                    <ul>
                        <li>
                            <img src="../../../../assets/images/ite_install.png" alt="" :class="{forbid:!item.isEdit}">
                        </li>
                        <li @click="handleSort('up',index)" :class="{forbid:index <= 1 || index == list.length - 1}">
                            <img :src="require(`../../../../assets/images/${index <= 1 || index == list.length - 1 ? 'ite_up_n' : 'ite_up'}.png`)" alt="">
                        </li>
                        <li @click="handleSort('down',index)" :class="{forbid:index == 0 || index >= list.length - 2}">
                            <img :src="require(`../../../../assets/images/${index == 0 || index >= list.length - 2 ? 'ite_down_n' : 'ite_down'}.png`)" alt="" >
                        </li>
                        <li :class="{forbid:!item.isDelete}" @click="handleDelete(index)">
                            <img src="../../../../assets/images/ite_trash.png" alt="">
                        </li>
                    </ul>
                </div>
                <!-- 右侧数据插入框 -->
                <div class="utils" v-if="item.utils">
                    <div class="title">
                        <span class="text">{{item.utils_title}}</span>
                        <i class="iconfont icon-guanbi" @click="handleClose"></i>
                    </div>
                    <render :value="item" :ref="index" :mode="mode" :key="index" :utils="true"></render>
                    <div class="bottom">
                        <div class="btn" @click="handleSave">
                            <span>保存</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script lang='ts'>
import {
    Component,
    Vue,
    Watch,
} from 'vue-property-decorator';
import {
    Mutation,
    namespace,
} from 'vuex-class';
import draggable from 'vuedraggable';
import { MenuOption } from '@/types/menu';
import { handleSetRem } from '@/utils/common';
import { ReturnParams } from '@/abstract/menuUtils';
import { PhoneSize } from '../../store/common/types';
import { ISortParams, IAddParams, IEditParams } from '@/modules/admin/store/shop/mutations';

interface MenuData {
    index: number;
    data: MenuOption;
}
const CommonVuex = namespace('common');
const ShopVuex = namespace('shop');
@Component({
    name: 'Mobile',
    components: {
        draggable,
    },
})
export default class Mobile extends Vue {
    // 拖拽状态
    @CommonVuex.State('dragStatus') private dragStatus!: boolean;

    // 获取主题
    @CommonVuex.State('theme') private theme!: string;

    // 修改拖拽状态
    @CommonVuex.Mutation('handleEditDragStatus')
    private handleEditDragStatus!: (status: boolean) => void;

    // 修改数据发生变化状态
    @CommonVuex.Mutation('handleChangeEditStatus')
    private handleChangeEditStatus!: (status: boolean) => void;

    // 保存移动端尺寸
    @CommonVuex.Mutation('handleSavePhoneSize') 
    private handleSavePhoneSize!: (data: PhoneSize) => void;

    // 店铺数据
    @ShopVuex.State('shop') private shop!: MenuOption[]; 

    // 保存店铺模块数据
    @ShopVuex.Mutation('handleAddShopMenuData')
    private handleAddShopMenuData!: (data: IAddParams) => void;

    // 删除组件数据
    @ShopVuex.Mutation('handleDeleteShopMenuData')
    private handleDeleteShopMenuData!: (index: number) => void;
    
    // 保存组件数据
    @ShopVuex.Mutation('handleEditMenuData')
    private handleEditMenuData!: (params: IEditParams) => void;

    // 店铺组件排序
    @ShopVuex.Mutation('handleShopMenuSort') 
    private handleShopMenuSort!: (params: ISortParams) => void;

    // 终端尺寸数据
    private readonly phoneSize: any = {
        'iPhone 5/SE': {
            width: 320,
            height: 568,
        },
        'iPhone 6/7/8': {
            width: 375,
            height: 667,
        },
        'iPhone 6/7/8 Plus': {
            width: 414,
            height: 736,
        },
        'iPhone X': {
            width: 375,
            height: 812,
        },
    };
    // 默认终端尺寸
    private phone = 'iPhone 6/7/8';
    // 当前模块
    private mode = 'mobile';
    // 店铺数据
    private list: MenuOption[] = [];
    // 正在编辑的下标
    private editIndex = -1;
    // 顶部距离
    private top = 0;
    // 左边距离
    private left = 0;

    // 数据监听
    @Watch('dragStatus')
    private changedragStatus(
        newVal: any, 
        oldVal: any,
    ): void {
        if (newVal) {
            this.handleClose();
        }
    }

    // 数据监听
    @Watch('theme')
    private changeTheme(
        newVal: any, 
        oldVal: any,
    ): void {
        this.handleClose();
    }

    // 深监听 immediate: true
    @Watch('list', { deep: true })
    private changeList(newVal: MenuOption[], oldVal: MenuOption[]): void {
        if (oldVal.length) {
            this.handleChangeEditStatus(true);
        }
        this.$nextTick(() => {
            setTimeout(() => {
                this.handleSetPlace(this.editIndex);
            });
        });
    }

    @Watch('shop')
    private changeMenuList(newVal: MenuOption[], oldVal: MenuOption[]): void {
       this.list = JSON.parse(JSON.stringify(newVal));
    }

    // 拖拽配置
    private get dragOptions(): object {
        return {
            animation: 300,
            group: {
                name: 'description',
            },
            ghostClass: 'ghost-mobile',
            scroll: true,
            // dragClass: 'dragClass',
        };
    }

    // 保存子组件编辑数据
    private handleSave() {
        const utils: ReturnParams = (this.$refs as any)[this.editIndex][0].$children[0]?.handleCheckData();
        if (utils.code) {
            this.list[this.editIndex].data = this.$deep(utils.data);
            this.handleEditMenuData({
                index: this.editIndex,
                data: this.$deep(utils.data),
            });
            this.handleClose();
            this.$message({
                message: '模块保存成功!',
                type: 'success',
            });
        } else {
            this.$message({
                message: utils.msg,
                type: 'error',
            });
        }
    }

    // 开始拖拽
    private handleDragStart(evt: any): void {
        this.handleEditDragStatus(true);
        this.handleClose();
    }

    // 移动
    private handleMove({ relatedContext, draggedContext }: any): boolean {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (
        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      );
    }

    // 结束拖拽
    private handleDragOver(): void {
        this.handleEditDragStatus(false);
    }

    // 显示编辑框
    private handleEdit(index: number): void {
        this.editIndex = index;
        this.handleSetPlace(index);
    }

    // 关闭编辑框
    private handleClose(): void {
        // 重置数据
        if (this.editIndex !== -1 && (this.$refs[this.editIndex] as [])?.length) {
            (this.$refs as any)[this.editIndex][0].$children[0]?.handleResetData();
        }
        this.editIndex = -1;
    }

    // 排序
    private handleSort(type: string, index: number): void {
        this.handleShopMenuSort({
            type,
            index,
            fn: (targetIndex: number) => {
                // 保存要交换的数据
                let target = this.list[targetIndex];
                this.$set(this.list, targetIndex, this.$deep(this.list[index]));
                this.$set(this.list, index, this.$deep(target));
                // 修改被编辑的下标
                this.editIndex = targetIndex;
            },
        });
    }

    // 拖拽排序
    private handleUpdateMenu(evt: any): void {
        this.handleShopMenuSort({
            index: evt.oldIndex,
            oldIndex: evt.newIndex,
        });
    }

    // 数据插入框位置
    private handleSetPlace(index?: number): void {
        index = index ?? this.editIndex;
        if (index === -1) {
            return;
        }
        let el = document.querySelector('.render_content') as HTMLElement;
        this.top = (this.$refs.menu_item as any)[index]?.offsetTop + 20;
        this.left = el?.offsetLeft + el?.offsetWidth + 14;
    }

    // 删除组件
    private handleDelete(index: number): void {
        if (this.list[index].isDelete) {
            // 重置编辑下标
            this.editIndex = -1;
            // 删除数据
            this.handleDeleteShopMenuData(index);
        }
    }

    // 设置rem
    private handleSetRem(): void {
        let mode = '';
        if (document.body.clientWidth > 1920) {
            mode = 'iPhone 6/7/8 Plus';
        } else if (document.body.clientWidth <= 1920 && document.body.clientWidth >= 1600) {
            mode = 'iPhone 6/7/8';
        } else if (document.body.clientWidth < 1600) {
            mode = 'iPhone 5/SE';
        }
        this.phone = mode;
        // 设置rem
        handleSetRem(this.phoneSize[this.phone].width);
        // 保存尺寸
        this.handleSavePhoneSize(this.phoneSize[this.phone]);
    }

    // 生命周期 - 创建之前
    private beforeCreate(): void {}

    // 生命周期 - 创建完成
    private created(): void {
        const setRem = this.$debounce(this.handleSetRem);
        const setPlace = this.$debounce(this.handleSetPlace, 210);
        // 自执行一次
        setRem();
        // 添加 resize 绑定事件
        window.addEventListener('resize', () => {
            setRem();
            setPlace();
        }, false);
    }

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
@import './style/mobile.scss';
</style>