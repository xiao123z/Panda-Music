<template>
  <div class='detail'>
    <!-- 头部导航 -->
     <div class='top'>
       <span @click='back'><i   class="iconfont icon-zuojiantou"></i></span>
       <span class="title">{{name}}</span>
     </div>
     <!-- 头像 -->
     <div class='avator' 
     :style="{'background-image':`url(${avator})`}" 
     ref='img'
     >
       <div class='shadow' ref="shadow">
          <div class="play-btn" @click="suiji" ref="playbtn"><i class="iconfont icon-bofang1"></i>随机播放</div>
       </div>
     </div>
     <!-- 歌曲列表 -->
     <div class='songlist' ref='wrapper'>
        <div class='content'>
          <ul>
            <li v-for='(item,index) in list' 
              :key='index'
              @click="openPlay(index)"
              >
               <h2>{{item.songname}}</h2>
             <span v-for="(ioo,il) in item.singer" :key="il">{{ioo.name}}</span>.<span>{{item.songname}}</span>
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
import BS from 'better-scroll'
import {recommendSong,getSongUrlByMid} from '../../api/api';
import { mapMutations, mapState } from 'vuex'
export default {
   ...mapState(['song']),

  data(){
    return{
      list:[],
      name:'暂无数据',
      avator:'',
      Lately:[],
    }
  },
 
  methods:{
    ...mapMutations(['addSongList','changeCurrendIndex','changeScreen',"addSong"]),
   back(){
          console.log(this);
      this.$router.go(-1)
    },
    suiji(){
              this.addSongList(this.list)
        let count  =this.list.length
             let index =parseInt(Math.random()*count)
          this.changeCurrendIndex(index)
          this.changeScreen(true)
    },
    openPlay(index){
      this.addSongList(this.list)
        var lt = JSON.parse(localStorage.getItem('play'));
  if(lt){
  
     lt.push(this.list[index])
    localStorage.setItem('play',JSON.stringify(lt) )
  }else{
   this.Lately.push(this.list[index])
      localStorage.setItem('play',JSON.stringify(this.Lately) )
  }

      this.changeCurrendIndex(index)
      // 点击屏幕变大
      this.changeScreen(true)
    },
    initBs(){
      let img = this.$refs.img
           let shadow = this.$refs.shadow
      let imgH= img.clientHeight 
      let wrapper = this.$refs.wrapper
      this.bs = new BS(wrapper,{probeType:3,click:true})
      this.bs.on('scroll',({y})=>{
        // 获取图片的元素和高度
        if(y>=0){
          //下拉放大
          let precent =1+(y/imgH)
          img.style.transform=`scale(${precent})`
          img.style.zIndex=1
            // playbt.style.display="block"

        }else{
          //向上滚动
          // 没有到顶部 滚动层的层级高
          // 到达顶部额时候 图片的层级高
          if(Math.abs(y)>imgH-40){
            img.style.zIndex=1
            img.style.paddingTop='0%'
            img.style.height='40px'
            shadow.style.display='none'

           
          }else{ 
             img.style.zIndex=-1
             img.style.paddingTop='70%'
             img.style.height=0
            shadow.style.display='block'
          }
        }
      })
    },
    handleList(list){
      let result =[] 
      let mids=[]
      result=list.map((item,index)=>{
        let {albummid,albumname,singer,songmid,songname} =item
        let albumUrl=`https://y.gtimg.cn/music/photo_new/T002R300x300M000${albummid}.jpg?max_age=2592000`
       mids.push(songmid)
        return {albummid,albumname,singer,songmid,songname,albumUrl}
      })
      return {result,mids} 
    

    }
     
  },
  async created(){
    let {recommendList} =this.$route.params
    // 根据歌手mid 发起请求获取数据
    let data = await recommendSong(recommendList) 
    let {result,mids}= this.handleList(data.cdlist[0].songlist) 
    // 通过接口 将mids 歌曲的媒体id 换成 音乐地址 之后将数据进行合并
    let {urls} =  await getSongUrlByMid(mids)
    let files=[]
    for (let index = 0; index < result.length; index++) {
     result[index].audioUrl = urls[index]
     if(urls[index]){
     files.push( result[index]) 
     }
    }
    this.list = files
    this.name = data.cdlist[0].dissname
    this.avator =data.cdlist[0].logo
    this.$nextTick(()=>{
      this.initBs()
    })
  }
}
/*
1.显示歌手名 v
2.显示歌手图片 v
3.显示歌单 v
4.返回 v
5.下拉头像放大 v
6.上滑遮住头像 v
7.随机播放
8.点击跳转到播放器页面
*/ 
</script>
<style lang="less" scoped>
@import '../../style/index.less';

.detail{
  position: fixed;
  top: 0px;
  bottom: 0px;
  background: #222;
  left:0px;
  right: 0px;
  // 头部
  .top{
    height: 40px;
    color: #fff;
    position: relative;
    top:0;
    z-index: 3;
    line-height: 40px;
  
    i{
      color:#ffcd32 ;
      font-size: 30px;
      margin-left: 10px;
      margin-top: 5px;
    }
    .title{
        font-size: @fs-l;
        position: absolute;
        left: 10%;
    top: -18%;
    }
  }
  // 头像
  .avator{
    .w(375);
    padding-top: 70%;
    background-size:cover; 
    position: absolute;
    top: 0px;
    z-index: -1;
  
    .shadow{
      position: absolute;
      top: 0;
      background: rgba(7,17,27,0.3);
      width: 100%;
      height: 100%;
        .play-btn{
        box-sizing: border-box;
        position: absolute;
    width: 135px;
    margin: 30px auto;
    text-align: center;
        top: 182px;
        padding: 7px 0;
    left: 116px;
    border: 1px solid yellow;
    color:yellow;
    border-radius: 100px;
    font-size: 12px;
    i{
        margin-right: 5px;
    font-size: 16px;

    }
}
    }
  }
  // 歌曲列表
  .songlist{
   position: fixed;
   background: #222;
  //  overflow: hidden;
   top:270px;
   bottom: 0px;
   left:0;
   right: 0;
   .content{
     padding: 10px 30px;
     background: #222;
     li{
       font-size: @fs-s;   
       color: #fff;
       height: 61px;
       h2{
        height: 20px;
        font-size: @fs-s;
       }
       span{
        margin-top:3px; 
        height:20px ;
         font-size: @fs-s;
         color: rgba(255,255,255,0.3)
       }
     }
   }
  }
}
</style>