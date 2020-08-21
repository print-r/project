import { GetterTree } from 'vuex';
import { CommonState } from './types';
import { StateOptions } from '../types';
import { ITheme } from '@/modules/admin/store/common/types';

export const getters: GetterTree<CommonState, StateOptions> = {
  getKeepAlive(state): string[] {
    return state.keepAlive;
  },
  getThemeList(state): ITheme {
    return state.themeList;
  },
};
