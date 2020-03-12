<template>
  <div id="app">
<Head></Head>
<Tab></Tab>
<keep-alive include="a,b,c,d"> <router-view></router-view></keep-alive>
   <Player></Player>
  </div>
</template>
<script>
import Head from '../src/components/Head'
import Tab from '../src/components/Tab'
import Player from '../src/components/Player'
export default {
  components:{Head,Tab,Player}

}
</script>
<style lang="less" scoped>
@import './style/index.less';
#app {
 background:@back;
  .w(375);
  height: 100vh;
}

</style>
