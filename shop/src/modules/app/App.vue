<template>
  <div id="app">
    <keep-alive :include="keepAlive">
      <router-view v-wechat-title="$route.meta.title" />
    </keep-alive>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {  
  namespace,
} from 'vuex-class';
const CommonVuex = namespace('common');
@Component
export default class App extends Vue {
  // 保存缓存组件名称
  @CommonVuex.Action('handleSyncAddCache') public handleSyncAddCache!: () => void; 
  // 缓存组件名称
  @CommonVuex.State('keepAlive') public keepAlive!: string[];
  private created(): void {
    // 保存缓存组件名称
    this.handleSyncAddCache();
  }
}
</script>

<style lang="scss">
@import '../../assets/style/common/common.scss';
@import '../../assets/style/iconfont/iconfont.css';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: $bg;
}
</style>
