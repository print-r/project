import { Module } from 'vuex';
import { state } from './state';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { ShopState } from './types';
import { StateOptions } from '../types';


const namespaced = true; // 全局可用

export const shop: Module<ShopState, StateOptions> = {
    namespaced,
    state,
    getters,
    actions,
    mutations,
};