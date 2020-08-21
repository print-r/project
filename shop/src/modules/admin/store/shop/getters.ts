import { GetterTree } from 'vuex';
import { ShopState } from './types';
import { StateOptions } from '../types';
import { MenuOption } from '@/types/menu';

export const getters: GetterTree<ShopState, StateOptions> = {
  getShopList(state): MenuOption[] {
    return state.shop;
  },
};