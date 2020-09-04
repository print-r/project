
import { MutationTree } from 'vuex';
import { MenuState, IMenuInitParams } from './types';
import { MenuOption } from '@/types/menu';
import { state as CommonState } from '../common/state';
import { IAddParams } from '../shop/types';

export const mutations: MutationTree<MenuState> = {
    // 初始化组件数据
    handleInitMenu(this: any, state, params?: IMenuInitParams) {
        // 重置组件使用次数
        this._mutations['menu/handleResetMenuStatus'][0]();
        // 初始数据
        let shopData = params?.data || this.getters['common/getThemeList'][CommonState.mode][CommonState.theme].data.container;
        // 保存店铺数据
        let data: MenuOption[] = [];
        let row: MenuOption;
        // 计算组件使用次数
        shopData.forEach((val: string | MenuOption) => {
            state.menu.forEach((item: MenuOption, index: number) => {
                if (item.template === (typeof val === 'object' ? val.template : val)) {
                    row = JSON.parse(JSON.stringify(item)) as MenuOption;
                    if (typeof val === 'object' && item.isEdit) {
                        row.data = JSON.parse(JSON.stringify(val.data));
                    }
                    // 次数+1
                    item.exist++;
                    data.push(row);
                }
                // 禁用组件
                if (state.menu[index].show && !state.menu[index].fixed && item.exist === item.max) {
                    state.menu[index].fixed = true;
                }
            });
        });
        // 保存主题
        if (params?.thmem) {
            this._mutations['common/handleInitTheme'][0](params.thmem);
        }
        // 保存PC端选中主题
        if (CommonState.mode === 'pc') {
            localStorage.setItem('theme', CommonState.theme);
        }
        // 保存店铺数据
        this._mutations['shop/handleSaveShopMenuData'][0](JSON.parse(JSON.stringify(data)));
    },
    // 添加模块
    handleAddMenu(this: any, state, item: IAddParams) {
        let flag = true;
        // 超出组件最大数
        if (item.data.exist + 1 > item.data.max) {
            flag = false;
        }
        state.menu.forEach((val: MenuOption, key: number) => {
            if (item.data.template === val.template) {
                // 生成数+1
                if (flag) {
                    state.menu[key].exist++;
                }
                // 禁用组件
                if (state.menu[key].exist === state.menu[key].max) {
                    state.menu[key].fixed = true;
                }
            }
        });
        // 保存数据
        if (flag) {
            this._mutations['shop/handleAddShopMenuData'][0](JSON.parse(JSON.stringify(item)));
        }   
    },
    // 更新组件状态
    handleUpdateMenuStatus(state, name: string) {
        state.menu.forEach((item: MenuOption) => {
            if (item.template === name) {
                // 取消禁止拖拽
                item.fixed = false;
                // 减少组件使用数
                if (item.exist >= 1) {
                    item.exist--;
                }
            }
        });
    },
    // 重置组件
    handleResetMenuStatus(state) {
        state.menu.forEach((item: MenuOption) => {
            if (item.show) {
                item.exist = 0;
                item.fixed = false;
            }
        });
    },
};