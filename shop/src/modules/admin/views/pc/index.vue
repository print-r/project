<template>
    <div class="pc">
        <draggable 
            class="render_content"
            v-model="list"
            v-bind="dragOptions"
            :move="handleMove"
            @start="handleDragStart"
            @end="handleDragOver"
            @update="handleUpdateMenu"
            :style="{background:`url(${themeList[mode][theme].background})`}"
        >
            <div class="menu_item" v-for="(item,index) in list" :key="index" :class="{layout:index != 0 && index != list.length - 1}">
                <!-- 选中框 -->
                <div class="place" :class="{active:index == editIndex}" @click.stop="handleEdit(index)">
                    <div class="top" v-show="index == editIndex">
                        <div class="name">{{item.name}}</div>
                        <div class="handle">
                            <ul>
                                <li class="edit" :class="{forbid:!item.utils}" @click.stop="handleOpenPopup(index)">
                                    <span>编辑</span>
                                </li>
                                <li @click.stop="handleSort('up',index)" :class="{forbid:index <= 1 || index == list.length - 1}">
                                    <img :src="require(`../../../../assets/images/${index <= 1 || index == list.length - 1 ? 'ite_up_pc' : 'ite_up_n_pc'}.png`)" alt="">
                                </li>
                                <li @click.stop="handleSort('down',index)" :class="{forbid:index == 0 || index >= list.length - 2}">
                                    <img :src="require(`../../../../assets/images/${index == 0 || index >= list.length - 2 ? 'ite_down_pc' : 'ite_down_n_pc'}.png`)" alt="" >
                                </li>
                                <li :class="{forbid:!item.isDelete}" @click.stop="handleDelete(index)">
                                    <img src="../../../../assets/images/ite_trash_pc.png" alt="">
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="item">
                    <render :value="item" :mode="mode" :key="index"></render>
                </div>
            </div>
        </draggable>
        <section class="utils_list">
            <div class="popup animated fadeInDown" v-for="(item,index) in list" :key="index" v-show="index === popupIndex">
                <div class="utils" v-if="item.utils">
                    <div class="title">
                        <span class="text">{{item.utils_title}}</span>
                        <i class="iconfont icon-guanbi" @click="handleClosePopup"></i>
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
        <div class="shade" v-if="popupIndex !== -1"></div>
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
import { ReturnParams } from '@/abstract/menuUtils';
import { ThemeOptions } from '@/types/theme';
import { ISortParams, IAddParams, IEditParams } from '@/modules/admin/store/shop/mutations';

interface MenuData {
    index: number;
    data: MenuOption;
}
const CommonVuex = namespace('common');
const ShopVuex = namespace('shop');
@Component({
    name: 'pc',
    components: {
        draggable,
    },
})
export default class Pc extends Vue {
   
    // 拖拽状态
    @CommonVuex.State('dragStatus') private dragStatus!: boolean;

    // 获取主题
    @CommonVuex.State('theme') private theme!: string;

    // 主题数据
    @CommonVuex.State('themeList') private themeList!: ThemeOptions;

    // 修改拖拽状态
    @CommonVuex.Mutation('handleEditDragStatus')
    private handleEditDragStatus!: (status: boolean) => void;

    // 修改数据发生变化状态
    @CommonVuex.Mutation('handleChangeEditStatus')
    private handleChangeEditStatus!: (status: boolean) => void;

    // 店铺数据
    @ShopVuex.State('shop') private shop!: MenuOption[];

    // 店铺组件排序
    @ShopVuex.Mutation('handleShopMenuSort')
    private handleShopMenuSort!: (params: ISortParams) => void;

    // 保存组件数据
    @ShopVuex.Mutation('handleEditMenuData')
    private handleEditMenuData!: (params: IEditParams) => void;

    // 删除组件数据
    @ShopVuex.Mutation('handleDeleteShopMenuData')
    private handleDeleteShopMenuData!: (index: number) => void;

    // 当前端
    private mode = 'pc';
    // 店铺数据
    private list: MenuOption[] = [];
    // 当前编辑的下标
    private editIndex = -1;
    // 弹框下标
    private popupIndex = -1;

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
    @Watch('list', { deep: true })
    private valueChange(newVal: any, oldVal: any): void {
        if (oldVal.length) {
            this.handleChangeEditStatus(true);
        }
        localStorage.setItem('pcMenuData', JSON.stringify(newVal));
    }

    @Watch('shop')
    private changeMenuList(newVal: MenuOption[], oldVal: MenuOption[]): void {
       this.list = JSON.parse(JSON.stringify(newVal));
    }

    // 数据监听
    @Watch('theme')
    private changeTheme(
        newVal: any, 
        oldVal: any,
    ): void {
        this.handleClose();
    }

    // 拖拽配置
    private get dragOptions(): object {
        return {
            animation: 300,
            group: {
                name: 'description',
            },
            ghostClass: 'ghost',
            scroll: true,
            dragClass: 'dragClass',
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
            this.handleClosePopup();
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

    // 显示选中框
    private handleEdit(index: number): void {
        this.editIndex = index;
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

    // 关闭编辑框
    private handleClose(): void {
        // 重置编辑下标
        this.editIndex = -1;
    }

    // 显示弹框
    private handleOpenPopup(index: number): void {
        if (this.popupIndex !== index && this.list[index].utils) {
            this.popupIndex = index;
        }
    }

    // 关闭弹框
    private handleClosePopup(): void {
        // 重置数据
        if (this.editIndex !== -1) {
            (this.$refs as any)[this.editIndex][0].$children[0]?.handleResetData();
        }
        this.popupIndex = -1;
    }

    // 删除组件
    private handleDelete(index: number): void {
        if (this.list[index].isDelete) {
            // 关闭
            this.handleClose();
            // 删除数据
            this.handleDeleteShopMenuData(index);
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
@import './style/index.scss';
</style>