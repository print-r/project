import Vue from 'vue';
import Vuex , { StoreOptions } from 'vuex';
import {common} from './common/index';
import { RootState } from './types';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  modules: {
    common,
  },
};

export default new Vuex.Store<RootState>(store);
