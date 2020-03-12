<template>
    <div class="rank">
         <div class='wrapper' ref='wrapper'>
      <div class='content'>
  <ul>
      <li class='item' v-for="(item,index) in list" :key="index" @click="goRankSong(item.id,index)">
<img v-lazy=item.picUrl alt="">
<div class="songlist" >
<p v-for="(songItem,songIndex) in item.songList"
 :key="songIndex">{{songIndex+1}}{{songItem.songname}}-{{songItem.singername}}</p>
<!-- <p>222</p>
<p>222</p> -->
</div>
      </li>
  </ul>
    </div>
         </div>
        <transition enter-active-class="animated slideInRight"
    leave-active-class="animated slideOutRight">
    <router-view></router-view>
    </transition>
         </div>
</template>
<script>
import {RankingList} from '../../api/api';
import BS from  'better-scroll'
import { Indicator } from 'mint-ui';
import { mapMutations } from 'vuex';

export default {
    data() {
        return {
            list:[]
        }
    },
    methods: {
      
      ...mapMutations(['addpic','addSongList']),
        goRankSong(id,index){
            this.$router.push(`/Rank/${id}`)
        },
        init(){
             let wrapper=this.$refs.wrapper
            this.bs=new BS(wrapper,{
                click:true,
                pullDownRefresh: {
          threshold: 50,
          stop: 20
        },
        pullUpLoad: {
          threshold: 50
        }
            })
this.bs.on('pullingDown',()=>{
        // 上次下拉刷新已经结束 可以开始下一次
        Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
     RankingList().then((res)=>{
              Indicator.close()
this.list=res.data.topList
 this.bs.finishPullDown()
})
      })
      // 监听上拉加载
      this.bs.on('pullingUp',()=>{
        // 上一次上拉加载已经结束可以开启下一次
        this.bs.finishPullUp()
      })

        }
    },
    mounted() {
           Indicator.open()
             RankingList().then((res)=>{
 Indicator.close()
this.list=res.data.topList
// console.log(this.list);
 this.bs.finishPullDown()
})
    this.$nextTick(()=>{
      this.init()
    })
    },
}
</script>
<style lang="less">
    @import '../../style/index.less';
    .rank{
        .wrapper{
            position:fixed;
            top: 88px;
            bottom: 0;
            right: 0;
            left: 0;
            overflow: hidden;
         
           li{
            .w(335);
            height: 120px;
        margin: 0 20px;
        position: relative;
        padding:  20px 0 0;
 img{
     height: 100px;
     width: 100px;
 }
 .songlist{
   width: 60%;
     height: 60px;
     padding: 20px 20px; 
     background: #333;
     position: absolute;
     right: 0;
     top: 20px;
     p{
         width: 195px;
         height: 26px;
         text-overflow:ellipsis;
         white-space:nowrap;
         font-size:@fs-xs ;
         color: rgba(255, 255, 255,0.3);
         overflow: hidden;
     }
 }
 }
        }
    }
</style>