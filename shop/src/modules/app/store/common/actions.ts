import { CommonState } from './types';
import { ActionTree } from 'vuex';
import { StateOptions } from '../types';

import router from '../../router/router';

export const actions: ActionTree<CommonState, StateOptions> = {
  // 保存缓存组件名称
  handleSyncAddCache({ commit }): void {
    const keepAliveData: any = {
        keepAlive: [],
    };
    router.forEach( (val: any) => {
        if (val.meta?.keepAlive) {
          keepAliveData.keepAlive.push(val.name);
        }
    });
    commit('handleAddCache', keepAliveData.keepAlive);
  },
};
