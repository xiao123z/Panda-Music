<template>
  <div id="Fs" v-if="!fullScreen">
    <!-- 图片区域 -->
    <div class="Toogs" @click="magnify">
      <div class="min-bg">
        <img :src="currentSong.albumUrl" :class="cd" />
      </div>
      <div class="min-txt">
          <div>{{currentSong.songname}}</div>
          <div class="Ft">{{currentSong.singer[0].name}}</div>
      </div>
    </div>

    <!-- 创建的按钮 -->
    <div class="min-icon">
        <span :class="this.play?'iconfont icon-bofang':'iconfont icon-bofang1'" @click="toogs" ></span>
        <!-- <span class="iconfont icon-yinleliebiao1" @click="show"></span> -->
    </div>

    <!-- <div class="ls" v-show="m_show"> -->
      <!-- top -->
      <!-- <div class="top">
        <span class="iconfont icon-liebiaoxunhuan one"  ></span>
        <p></p>
        <span class="iconfont icon-lajitong2 two" ></span>
      </div> -->

      <!-- 歌单 -->
      <!-- <div class="lts" ref='lts' :class='dp==1?"lisb":""'>
        <ul>
          <li v-for="(ele,index) in showt" :key='index'>
            <span class="iconfont  bf" :class='index==Index?"icon-zanting":""'></span>
            <p @click="palys(index)">{{ele.songname}}</p>
            <span class="iconfont icon-lajitong3 sc" @click="del(index)"></span>
            <span class="iconfont icon-xihuan xh"></span>
          </li>
        </ul>
      </div> -->



      <!-- 添加到 -->
      <!-- <div class="tj">
        <p>添加歌曲到队列</p>
      </div> -->

      <!-- 关闭 -->
      <!-- <div class="shut" @click="show">关闭</div> -->
    <!-- </div> -->
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
// import Bs from 'better-scroll'
export default {

//   created() {
//    this.$nextTick(() => {
//       this.scroll();
//     });
//   },


    // 接收父元素的方法
   props:['cd','play'],


  //  数据
  data() {
    return {
    //   m_show:false,
      // hg:false,
    }
  },




  // 计算属性
  computed: {
    //   映射全局数据
    ...mapState(['songList','fullScreen','loop','Time']),
    ...mapGetters(['currentSong',]),
  },



  //   方法
  methods: {
    //   映射全局方法
    ...mapMutations(['changeScreen','nextCurrendIndex','prevCurrendIndex','changeCurrendIndex','changeLoop','seekPlay']),
    // 222222222222修改播放页显示大屏幕
    // 使用全局的修改数据的方法
    magnify() {
      this.changeScreen(true); 
    },
    // 点击事件  
    toogs(){
        // 使用父元素的play方法
        this.$emit('togglePlay')
    },

  },


  watch: {
  }
}
</script>

<style lang='less' >
@import "../../style/index.less";
/* // 小屏幕 */
#Fs {
  width: 100%;
height: 60px;
  background: #333;
  z-index: 100;
  position: fixed;
  bottom: 0px;
  display: flex;
//   歌曲专辑
  .Toogs {
    display: flex;
    // justify-content: center;
    padding: 10px 0 0 2px;
    height: 100%;
    width: 70%;

    // 图片
    .min-bg {
      width: 40px;
           height: 40px;

      overflow: hidden;
      border-radius: 50%;
      margin-left: 20px;
    //   .l_h(40);
      img {
        width: 100%;
        height: 100%;
      }
        & .cd{
        animation: rotate 10s linear infinite;
      }
      & .paused{
        animation-play-state: paused;
      }
    }

    // 文职
    .min-txt{
        margin-left: 15px;
        div{
         font-size: 14px;
            padding-bottom: 3px;
            // color: @fff;
            overflow: hidden; /*自动隐藏文字*/
            text-overflow: ellipsis;/*文字隐藏后添加省略号*/
            white-space: nowrap;/*强制不换行*/
            .w(130)
        }
        .Ft{
            color: #fff;
            font-size: 12px;
        }
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
  .min-icon{
      position: relative;
      span{
          position: absolute;
          top: 9px;
         font-size: 35px;
          margin-left: 10px;
          color: yellow;
      }
  }




 & .ls{
    background-color:#333;
    position: fixed;
    height: 430px;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px 20px 0 20px;


  // 添加
//   .tj{
//     .h(80);
//     .l_h(60);
//     text-align: center;
//     p{
//       display: inline-block;
//       .w(140);
//       .h(30);
//       .l_h(30);
//       border-radius: 20px;
//       .fot(12);
//       border: 1px solid @bai03;
//       color: @bai03;
//     }
//   }



    
    // 歌单
    // .lts{
    //   margin-top: 10px;
    //   height: 240px;
    //   overflow: hidden;
    //   li{
    //     display: flex;
    //     align-items: center;
    //     .bf{
    //       .w(12);
    //       .h(12);
    //       color: @yell;
    //       .fot(12);
    //     }
    //     .sc{
    //       .w(32);
    //       text-align: center;
    //       .fot(12);
    //       .h(12);
    //       color: @yell;
    //     }
    //     .xh{
    //       .w(32);
    //       text-align: center;
    //       .fot(12);
    //       .h(12);
    //       color: @yell;
    //     }
    //     p{
    //       .w(266);
    //       .fot(14);
    //       color: @bai;
    //       padding: 10px
    //     }
    //   }
    // }

    // .lisb{
    //   .h(40)
    // }

    // top不
    // .top{
    //   .h(30);
    //   display: flex;
    //    align-items: center;
    //   .one{
    //     color: @yell;
    //     .w(30);
    //     .h(30);
    //     .fot(30)
    //   }

    //   p{
    //     .fot(14);
    //     width: 271px;
    //     .l_h(30);
    //     // text-indent: 1px;
    //     padding-left: 10px;
    //     color: @bai03;
    //   }

    //   .two{
    //     // color: @bai03;
    //     // .w(14);
    //     // .h(14);
    //     // .fot(14)
    //   }
    // }



    

    // 关闭
    // .shut{
    //   position: absolute;
    //   bottom: 0;
    //   width: 100%;
    //   left: 0;
    //   right: 0;
    //   height: 50px;
    // //   background-color: @backs;
    // //   .fot(16);
    //   text-align: center;
    // //   .l_h(50);
    // //   color: @bai;
    // }
  }

//   .hsg{
//       height:230px ;
//     }
 
}
</style>