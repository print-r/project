import { MutationTree } from 'vuex';
import { CommonState, PhoneSize } from './types';
import themeList from '@/components/menu/theme/pc';

export const mutations: MutationTree<CommonState> = {
    // 添加缓存
    handleAddCache(state, name: string[] | string) {
        if (typeof name === 'object') {
            state.keepAlive = [...name];
        } else {
            if (state.keepAlive.indexOf(name) === -1) {
                state.keepAlive.push(name);
            }
        }
    },
    // 删除缓存
    handleRemoveCache(state, name: string) {
        const index = state.keepAlive.indexOf(name);
        if (index !== -1) {
            state.keepAlive.splice(index, 1);
        }
    },
    // 修改拖拽状态
    handleEditDragStatus(state, status: boolean) {
        state.dragStatus = status;
    },
    // 保存当前端
    handleSaveCurrentMode(state, mode: string) {
        state.mode = mode;
    },
    // 保存移动端尺寸
    handleSavePhoneSize(state, data: PhoneSize) {
        state.phoneSize = data;
    },
    // 保存商家id
    handleSaveMid(state, id: string) {
        state.mid = id;
    },
    // 初始化主题
    handleInitTheme(state, theme: string) {
        // 保存主题
        state.theme = theme;
    },
    // 切换主题
    handleChangeTheme(this: any, state, theme: string) {
        // 保存主题
        state.theme = theme;
        // 修改主题头尾
        this._mutations['shop/handleEditTheme'][0]();
        // 保存PC端预览主题数据
        if (state.mode === 'pc') {
            localStorage.setItem('theme', theme);
        }
    },
    // 修改数据发生变化状态
    handleChangeEditStatus(state, status) {
        state.isEdit = status;
    },
};
