<template>
  <div id="app" :class="{'layout-reset':!weChat}">
     <keep-alive :include="keepAlive">
          <router-view v-wechat-title="$route.meta.title" />
      </keep-alive>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'App',
  computed:{
    ...mapState([
      'keepAlive',
      'weChat'
    ])
  }
}
</script>

<style lang="scss">
@import '/common/css/style/common.scss';
@import '/common/css/iconfont/iconfont.css';

#app {
  display: block;
  width: 100%;
  height: 100%;
  font-family: PingFangSC-Medium;
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}

.layout-reset
{
  .layout,.layout-2
  {
    padding-top: 108px;
  }
}
</style>
