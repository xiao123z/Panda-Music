<template>
  <div class='player' v-if='songList.length'>
    <div v-show='fullScreen' class='big'>
    <!-- 头部 -->
     <div class='top'> 
       <span @click='changeScreen(false)'><i class="iconfont icon-zuojiantou"></i></span>
       {{currentSong.songname}}
     </div>
     <!-- 背景 -->
     <div class='bg'>
       <img :src="currentSong.albumUrl" alt="">
     </div>
     <!-- 歌手 -->
     <p class='name'>{{currentSong.singer[0].name}}</p>
     <!-- 专辑图片 -->

            <div class='img'>
       <img :class='cd' :src="currentSong.albumUrl" alt="">
     </div>
     <!-- 歌词 -->
     <Lyric :seekTime = 'seekTime' :play='play'></Lyric>
       
     
     <!-- 进度条 -->
     <div class="pla">
     <MyProgress
      :startTime = 'startTime'
      :endTime = 'endTime'
      @seekFa='seek'
     ></MyProgress>
     <!-- 播放 -->
    
     <span @click='changeLoop' class="xun">
       <span  v-if="loop === 0" class="iconfont icon-buxunhuanbofang-
"></span>
       <span  v-if="loop === 3" class="iconfont icon-liebiaoxunhuan"></span>
       <span  v-if="loop === 1" class="iconfont icon-danquxunhuan"></span>
       <span  v-if="loop === 2" class="iconfont icon-bofangye-caozuolan-suijibofang"></span>
      </span>
     <span @click='prev' class="prev"><i class="iconfont icon-xiayishou1
"></i></span>
     <span @click='togglePlay' class="play"><i :class="this.play?'iconfont icon-bofang':'iconfont icon-bofang1'"></i></span>
         <span @click='next' class="next"><i class="iconfont icon-xiayishou"></i></span>
         <span @click='like()' class="like"><i :class="love?'iconfont icon-xihuan':'iconfont icon-xihuan1'"></i></span>
     <!-- 播放器 -->
     <audio ref='audio' 
            @ended='ended'
            @canplay='canplay'
            @timeupdate="timeupdate"
            :src='currentSong.audioUrl'></audio>
    </div>
    </div>
   <playMin :cd='cd' @togglePlay="togglePlay" :play='play'></playMin>
  </div>
</template>
<script>
import MyProgress from 'components/Progress'
import Lyric from 'components/Lyric'
import Swiper from 'swiper'
import playMin from '../playMin/index'
import {mapState, mapMutations, mapGetters} from 'vuex'
export default {
  components:{MyProgress,Lyric,playMin},
  data(){
    return{
      startTime:0,
      endTime:0,
      play:false,
      seekTime:0,
      love:true,
      list:[]
    }
  },
  computed:{
    ...mapState(['songList','fullScreen','loop','Time']),
    ...mapGetters(['currentSong',]),
    cd(){
      return this.play?'cd':'cd paused'
    }
  },
  
  methods:{
    ...mapMutations(['changeScreen','nextCurrendIndex','prevCurrendIndex','changeCurrendIndex','changeLoop','seekPlay']),
    togglePlay(){
      this.play=!this.play

    },
    like(){
this.love=!this.love
if (!this.love) {
  var lt = JSON.parse(localStorage.getItem('like'));
  if(lt){
    lt.push(this.currentSong)
    localStorage.setItem('like',JSON.stringify(lt) )
  }else{
    this.list.push(this.currentSong)
      localStorage.setItem('like',JSON.stringify(this.list) )
  }
}else{
var lt = JSON.parse(localStorage.getItem('like'));
let zz=lt.length-1
    lt.splice(zz, 1);
    this.list.splice(zz,1)
    localStorage.setItem('like', JSON.stringify(lt));
//    localStorage.setItem('like', JSON.stringify(list));
  
    
  
}
///测试
    },
    timeupdate(e){
      // console.log('歌曲播放',e)
      // 随着播放更新时间
      this.startTime =e.target.currentTime
      // console.log(this.startTime);
      this.seekPlay=this.startTime
      
    },
    canplay(){
      // 歌曲可以播放 
      this.audio = this.$refs.audio 
      this.audio.play()
      this.play = true
      // 获取歌曲的总时长 
      this.endTime = this.audio.duration

    },
    seek(s){
      if(!this.audio){ return false} 
      // 更改播放的时间 
        if(!this.audio){ return false} 
      // 更改播放的时间 
      this.audio.currentTime = s
      // 更改歌词的时间
      this.seekTime = s  
    },
    ended(){
      this.play = false
      switch (this.loop) {
        case 1:
          //  单曲循环 
          this.play = true
          this.audio.play()
          break;
        case 2:
          // 列表相当于下一曲
          this.nextCurrendIndex()
          break;
        case 3 :
          //随机播放
          let count = this.songList.length    
          let index =parseInt(Math.random()*count)
          this.changeCurrendIndex(index)
        default:
          break;
      }
    },
    next(){
      //下一曲 
      this.nextCurrendIndex()
      this.love=true
    },
    prev(){
      // 上一曲 
      this.prevCurrendIndex()
      this.love=true

    }
  },
//   created() {
//             var ces = JSON.parse(localStorage.getItem('like'));
//   // if(ces!=[]){
//     console.log(ces);
//   for (let index = 0; index < ces.length; index++) {
//   const element = ces[index];
//   console.log(element.albummid);
//   console.log(this.currentSong.albummid);
  
// //   if(element.albummid==this.currentSong.albummid){
// // this.love=true
// //   }
 
  
// // }
//   }


  // },

  watch:{
    play(newValue,oldValue){
      if(!this.audio) return false 
      //点击按钮 还是循环
      if(newValue){
        this.audio.play()
      }else{
        this.audio.pause()
      }
    },
   
  //   currentSong(newValue,oldValue){
  //       //  歌曲发生改变 应该自动播放
  //       if(!this.audio){ return false}
  //       this.audio.play()
  //  }
currentSong(){
              var ces = JSON.parse(localStorage.getItem('like'));
if(ces){
  for (let index = 0; index < ces.length; index++) {
  const element = ces[index];
  if(this.currentSong.songmid==element.songmid){
this.love=false
  }else{ 
  }
// }
  }
}
}
  } 
}

</script>
<style lang="less" scoped>
@import '~style/index.less';
@import '~swiper/css/swiper.min.css';
.player{
  color: #fff;
  .swiper-container{
      .w(375);
  
  }
  .big{
    position: fixed;
    top:0px;
    bottom: 0px;
    left:0;
    right:0;
    background: #222;
    .top{
      font-size: @fs-l;
      text-align: center;
      position: relative;
        span{
      position: absolute;
      left: 10px;
      transform: rotate(-90deg);
      display: inline-block;
      i{
              font-size: 30px;
    color: #ffcd32;
      }
    }
      .title{
        display: inline-block;
        position: absolute;
    left: 5%;
 font-size: 30px
      }
    }
    .name{
      font-size: @fs-s;
      text-align: center;
      padding: 10px;
    }
    .bg{
      position: absolute;
      z-index: -9;
      top: 0px;
      width: 100%;
      height: 100%;
      filter: blur(15px);
      img{
         width: 100%;
         height: 100%;
      }
    }
    .img{
    
      text-align: center;
      // background: red;
      .w(375);
      padding: 20px;
      box-sizing: border-box;
      img{
          width: 85%;
          border-radius:50%;
          border: 10px solid #ccc; 
      }
      & .cd{
        animation: rotate 10s linear infinite;
      }
      & .paused{
        animation-play-state: paused;
      }
    }
    .pla{
      position: absolute;
bottom: 68px;
.prev{
position: absolute;
bottom: -7px;
left: 83px;
}

.play{
  position: absolute;
bottom: -8px;
    left: 155px;
}
.next{
    position: absolute;
bottom: -7px;
right: 89px;
}
.like{
   position: absolute;
bottom: -7px;
right: 16px;
}
i{
  font-size: 45px;
  margin-top: 5px;
  color: yellow;
  top: 5px;
}
.xun{
  display: inline-block;
 position: relative;
  line-height: 30px;
  margin-right: 10px;
  margin-left: 10px;
  color: yellow;
top: 5px;
 
  text-align: center;
  border-radius: 50%;
  padding: 2px;
  // border: 2px yellow solid;
  span{
    font-size: 46px;
  }
  }
    }
  }
  .small{
    position: fixed;
    .w(375);
    bottom: 0px;
    height: 60px;
    .w(375);
    background: #333;
    .smallPlay{
    position: absolute;
    right: 37px;
    top: 8px;
    float: left;
    i{
      font-size: 38px;
    }
  }
.min-play{
  
  .text{
   
    position: absolute;
       top: 6px;
    left: 78px;

    p{
      font-size: 14px;
      margin-top: 5px;
    }
  }
   
  position: relative;
      .w(300);

    height: 60px;
    .img{
      width: 40px;
    height: 40px;
float: left;
    padding: 10px 10px 0px 20px;
    img{
 width: 40px;
 border-radius: 50%;
    height: 40px;
    }
   
      & .cd{
        animation: rotate 10s linear infinite;
      }
      & .paused{
        animation-play-state: paused;
      }
    }
    .name{
      .w(205);
      height: 20px;
      font-size: 14px;
       color: #fff;
       padding-top: 10px;
    }
    .desc{
      .w(205);
      height: 20px;
      font-size: 12px;
      color:rgba(255, 255, 255, 0.3)
    }
  }
      button{
     position: absolute;
     top: 30%;
     right: 20%;
      }
  }
  @keyframes rotate {
    0% {
     transform: rotate(0deg)
    }
    100%{
      transform: rotate(360deg)
    }
  }
  
}  
</style>