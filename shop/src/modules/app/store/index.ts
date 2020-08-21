import Vue from 'vue';
import Vuex , { StoreOptions } from 'vuex';
import { StateOptions } from './types';
import { common } from './common';

Vue.use(Vuex);

const store: StoreOptions<StateOptions> = {
  modules: {
    common,
  },
};

export default new Vuex.Store<StateOptions>(store);
