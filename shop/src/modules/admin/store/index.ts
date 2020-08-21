import Vue from 'vue';
import Vuex , { StoreOptions } from 'vuex';
import { StateOptions } from './types';
import { common } from './common';
import { menu } from './menu';
import { shop } from './shop';

Vue.use(Vuex);

const store: StoreOptions<StateOptions> = {
  modules: {
    common,
    menu,
    shop,
  },
};

export default new Vuex.Store<StateOptions>(store);
