import { Module } from 'vuex';
import { state } from './state';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { CommonState } from './types';
import { StateOptions } from '../types';

const namespaced = true; // 全局可用

export const common: Module<CommonState, StateOptions> = {
    namespaced,
    state,
    getters,
    actions,
    mutations,
};
