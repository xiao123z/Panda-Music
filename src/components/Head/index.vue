<template>
    <div class="head">
        <img src="/favicon.ico" alt="">
        <span>Panda Music</span>   
        
        <router-link to="My"><div class="icon"><i class="iconfont icon-yonghu"></i></div></router-link>
<!-- <router-view></router-view> -->
    </div>
    
</template>
<script>
 import My from '../My/index'
export default {
}
</script>
<style lang="less" scoped>
@import '../../style/index.less';
@import '../../style/icon/iconfont.css';
    .head{
        position: relative;
        .w(375);
        height: 44px;
        // background: red;
    display: flex;
    justify-content: center;
    align-items: center;
    span{
        color: @yellow;
        font-size: @fs-l;
    }
    img{
        width: 32px;
        height: 32px;
        margin-right: 5px;
    }
    .icon{
position: absolute;
    right: 13px;
    top: -6px;
}
i{
        font-size: 26px;
    color: #ffcd32;
}
    
    }
</style>