<template>
  <div id="app">
    <keep-alive :include="keepAlive">
        <router-view v-wechat-title="$route.meta.title" />
    </keep-alive>
  </div>
</template>

<script lang="ts">
import { 
  Component, 
  Vue,
} from 'vue-property-decorator';
import {  
  State,
  Getter,
  Action,
  Mutation,
  namespace,
} from 'vuex-class';
const CommonVuex = namespace('common');
@Component
export default class Admin extends Vue {
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

@include media();

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: $bg;
  color: #2c3e50;
  min-width: 1200px;
}
</style>