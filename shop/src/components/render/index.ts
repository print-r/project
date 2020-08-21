import render from './render';

const menu = {
  render,
};

const install = (Vue: any, opts = {}) => {
  Vue.component(render.name, render);
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default Object.assign(menu, { install });
