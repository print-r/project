
import { MutationTree } from 'vuex';
import { ShopState } from './types';
import { MenuOption } from '@/types/menu';
import { state as CommonState } from '../common/state';

export interface IAddParams {
    index: number;
    data: MenuOption;
}

type SortType = 'up' | 'down';

export interface ISortParams {
    type?: SortType;
    index: number;
    oldIndex?: number;
    fn?: (index: number) => void;
}

export interface IEditParams {
    index: number;
    data: any;
}

export const mutations: MutationTree<ShopState> = {
    // 保存店铺数据
    handleSaveShopMenuData(state, data: MenuOption[]) {
        state.shop = data;
    },
    // 添加店铺模块
    handleAddShopMenuData(state, data: IAddParams) {
        state.shop.splice(data.index, 0, data.data);
    },
    // 组件排序
    handleShopMenuSort(state, params: ISortParams) {
        let targetIndex = params.oldIndex as number;
        let index = params.index;
        let type = params.type;
        let fn = params.fn || function() {};
        if (!params.oldIndex) {
            if (index === 0 || index === state.shop.length - 1) {
                return;
            }
            // 向上排序
            if (type === 'up') {
                if (index === 1) {
                    return;
                } else {
                    targetIndex = index - 1;
                }
            } 
            // 向下排序
            if (type === 'down') {
                if (index === state.shop.length - 2) {
                    return;
                } else {
                    targetIndex = index + 1;
                }
            }
            fn(targetIndex);
        }
        // 保存要交换的数据
        let target = Object.assign({}, JSON.parse(JSON.stringify(state.shop[targetIndex])));
        state.shop[targetIndex] = Object.assign({}, JSON.parse(JSON.stringify(state.shop[index])));
        state.shop[index] = target;
    },
    // 删除组件
    handleDeleteShopMenuData(this: any, state, index: number): void {
        // 更新组件状态
        this._mutations['menu/handleUpdateMenuStatus'][0](state.shop[index].template);
        // 删除组件
        state.shop.splice(index, 1);
    },
    // 保存组件编辑数据
    handleEditMenuData(state, params: IEditParams): void {
        state.shop[params.index].data = params.data;
    },
    // 修改主题头尾
    handleEditTheme(this: any, state): void {
        if (state.shop.length) {
            // 主题数据
            const theme = this.getters['common/getThemeList'][CommonState.mode][CommonState.theme].data.container;
            // 修改主题头
            if (state.shop[0].template !== theme[0]) {
                state.shop[0].template = theme[0];
                state.shop.splice(0, 1, Object.assign({}, JSON.parse(JSON.stringify(state.shop[0]))));
            }
            // // 修改主题底部
            if (state.shop[state.shop.length - 1].template !== theme[theme.length - 1]) {
                state.shop[state.shop.length - 1].template = theme[theme.length - 1];
                state.shop.splice(state.shop.length - 1, 1, Object.assign({}, JSON.parse(JSON.stringify(state.shop[state.shop.length - 1]))));
            }
        }
    },
};