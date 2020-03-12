<template>
    <div class="recommend">
          <div class='wrapper' ref='wrapper'>
      <div class='content'>
        <banner :banners="list"></banner>
         <div class="title">热门歌单推荐</div>
<ul>
    <li v-for="(item,index) in recommendList" :key="index">
                <img  v-lazy="item.imgurl" alt="">
           <div class="text">
               <p class="name">{{item.creator.name}}</p>
               <p class="dec">{{item.dissname}}</p>
           </div>
            </li>
</ul>
      </div>
          </div>
    </div>
</template>
<script>
import banner from '../Banner'
import { Indicator } from 'mint-ui';

import {recommendBanner,recommendList} from '../../api/api'
import BS from  'better-scroll'


export default {
    components:{banner},
    data() {
        return {
            list:[],
            recommendList:[]
        }
    },
    methods:{
 initBs(){
      let wrapper = this.$refs.wrapper
    this.bs=  new BS(wrapper,{
  pullDownRefresh: {
          threshold: 50,
          stop: 20
        },
        pullUpLoad: {
          threshold: 50
        }
      })
      this.bs.on('pullingDown',()=>{
          Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
  recommendList()
.then((res)=>{
          Indicator.close()

    this.recommendList=res.data.list
    this.bs.finishPullDown()
})
      })
       this.bs.on('pullingUp',()=>{
     
        // 上一次上拉加载已经结束可以开启下一次
        this.bs.finishPullUp()
      })
    }
    },
    mounted() {
      
         Indicator.open()
  recommendBanner()
.then((res)=>{ 
    this.list=res.data.slider
})
  recommendList()
.then((res)=>{
    this.recommendList=res.data.list
        Indicator.close();
})
  
   this.initBs()
    },
    activated(){
    
  },
  deactivated(){
  
  },
  destroyed(){
  
  }
}
</script>
<style lang="less">
    @import '../../style/index.less';
    .recommend{
        .wrapper{
            position: fixed;
            top: 88px;
            bottom: 0;
            left: 0;
            right: 0;
            overflow: hidden;
            .content{
.w(375);
       li{
        padding: 0 20px 20px;
        list-style: none;
       .w(335);
        height: 63px;
        /* background: black */
    }
    li img{
        width: 60px;
        height: 60px;
        float: left;
    }
    li .text{
           .w(255);
        height: 50px;
        margin-top: 5px;
        /* background: black; */
        float: right;
    }
    li .name{
        color: #ffff;
        font-size: @fs-s;
        padding-bottom: 10px
    }
    li .dec{
         font-size: @fs-s;
        color: rgba(255, 255, 255, 0.3)
    }
            }
        }
           .title{
        .w(375);
      height: 65px;
        color:@yellow;
       font-size: @fs-s;
        text-align: center;
        line-height: 65px
    }
    }
</style>