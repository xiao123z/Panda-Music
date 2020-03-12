<template>
    <div class="tab">
        <router-link to="/Recommend" tag="div" active-class="res">
        <span>推荐</span></router-link>
        <router-link to="Singer" tag="div" active-class="res">
            <span>歌手</span>
            </router-link>
        <router-link to="Rank" tag="div" active-class="res"><span>排行</span></router-link>
        <router-link to="Search" tag="div" active-class="res"><span>搜索</span></router-link>
      
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less" scoped>
    @import '../../style/index.less';
    .tab{
        .w(375);
        height: 44px;
        display: flex;
        text-align: center;
font-size: @fs-s;
line-height: 44px;
div{
    width: 25%;
    height: 44px;
    text-align: center;
     color: rgba(255,255,255,0.5);
}
.res{
color: @yellow;
span{
    border-bottom:2px solid @yellow;
    padding-bottom: 5px;
        
}
}
    }
</style>