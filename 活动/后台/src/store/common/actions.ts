import { CommonState } from './types';
import { ActionTree } from 'vuex';
import { RootState } from '../types';
import router from '../../router';

interface Route {
  path: string;
  name: string;
  meta: {
    keepAlive: boolean,
  };
}

export const actions: ActionTree<CommonState, RootState> = {
  // 保存缓存组件名称
  handleSyncAddCache({ commit }): void {
    const keepAliveData: CommonState = {
        keepAlive: [],
    };
    (router as any).options.routes.forEach( (val: Route) => {
        if (val.path !== '/' && val.meta.keepAlive) {
          keepAliveData.keepAlive.push(val.name);
        }
    });
    commit('handleAddCache', keepAliveData.keepAlive);
  },
};
