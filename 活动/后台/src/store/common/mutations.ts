import { MutationTree } from 'vuex';
import { CommonState } from './types';

export const mutations: MutationTree<CommonState> = {
    // 添加缓存
    handleAddCache(state, name: string[]|string) {
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
};
