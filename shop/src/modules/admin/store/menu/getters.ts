import { GetterTree } from 'vuex';
import { MenuState } from './types';
import { StateOptions } from '../types';
import { MenuOption } from '@/types/menu';

export const getters: GetterTree<MenuState, StateOptions> = {
  getMenuList(state): MenuOption[] {
    return state.menu;
  },
};