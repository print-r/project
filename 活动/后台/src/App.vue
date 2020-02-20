<template>
  <div id="app">
    <keep-alive :include="keepAlive">
          <router-view />
      </keep-alive>
  </div>
</template>

<script lang="ts">
import { namespace } from 'vuex-class';
import { Component, Vue } from 'vue-property-decorator';

const Vuex = namespace('common');

@Component
export default class App extends Vue {
  @Vuex.Action('handleSyncAddCache') public handleSyncAddCache!: () => void; // 保存需要缓存的组件名称
  @Vuex.State('keepAlive') public keepAlive!: string[];
  private created(): void {
    this.handleSyncAddCache();
  }
}
</script>

<style lang="scss">
@import './assets/style/common.scss';
@import './assets/iconfont/iconfont.css';
.body
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;
}
</style>
