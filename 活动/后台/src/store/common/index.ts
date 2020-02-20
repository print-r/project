import { Module } from 'vuex';
import { CommonState } from './types';
import { RootState } from '../types';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';

const state: CommonState = {
    keepAlive: [],
};

const namespaced = true; // 全局可用

export const common: Module<CommonState, RootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations,
};

export default state;
