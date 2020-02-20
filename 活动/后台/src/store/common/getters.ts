import { GetterTree } from 'vuex';
import { CommonState } from './types';
import { RootState } from '../types';

export const getters: GetterTree<CommonState, RootState> = {
  fullName(state): string {
    return `${state.keepAlive}`;
  },
};
