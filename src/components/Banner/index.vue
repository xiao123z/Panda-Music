<template>
   <div class="swiper-container">
    <div class="swiper-wrapper">
        <div class="swiper-slide" :key="index" v-for="(item,index) in banners">
            <img :src="item.picUrl" alt="">
        </div>
    </div>
    <!-- 如果需要分页器
    <div class="swiper-pagination" id="ss"></div> -->
   </div>
</template>
<script>
import Swiper from 'swiper'

export default {
    props:{
        'banners':{type:Array,default:[]}
    },
    methods: {
    initBanner(){
      new Swiper('.swiper-container',{
           loop: true,
            autoplay:{
            delay:2000,
            disableOnInteraction:false
          },
           pagination: {
      el: '.swiper-pagination',
    },
      })
    }
    },
    watch: {
banners(){
  this.$nextTick(()=>{
        this.initBanner()
      })
        }
    },
}   

</script>
<style lang="less" scoped>
@import '../../style/index.less';
@import '~swiper/css/swiper.min.css';
    .swiper-container {
    .w(375);
    .h(150);
img{
   .w(375);
  .h(150)
}  
}
</style>