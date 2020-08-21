import { GetterTree } from 'vuex';
import { CommonState, ITheme } from './types';
import { StateOptions } from '../types';

export const getters: GetterTree<CommonState, StateOptions> = {
  getKeepAlive(state): string[] {
    return state.keepAlive;
  },
  getTheme(state): string {
    return state.theme;
  },
  getThemeList(state): ITheme {
    return state.themeList;
  },
  getMode(state): string {
    return state.mode;
  },
};
