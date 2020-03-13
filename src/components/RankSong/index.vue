<template>
  <div class='detail'>
    <!-- 头部导航 -->
     <div class='top'>
       <span ><i @click='back' class="iconfont icon-zuojiantou"></i></span>
       <span class="title">{{name}}</span>
     </div>
     <!-- 头像 -->
     <div class='avator' 
     :style="{'background-image':`url(${avator})`}" 
     ref='img'
     >
       <div class='shadow' ref="shadow">
           <div class="play-btn" @click="suiji"><i class="iconfont icon-bofang1"></i>随机播放</div>
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
              <div class="text">{{index+1}}</div>
              <div class="cont"><h2>{{item.songname}}</h2>
               <span v-for="(itemS,indexS) in item.singer"
               :key='indexS'>{{itemS.name}}</span>.<span>{{item.albumname}}</span></div>
               
            </li>
          </ul>
        </div>
     </div>
     <router-view></router-view>
  </div>
</template>
<script>
import BS from 'better-scroll'
import {getSongByMid,getSongUrlByMid,getRankByMid,getRankBySong} from 'api/api.js'
import { mapMutations, mapState } from 'vuex'
export default {

  data(){
    return{
      list:[],
      name:'暂无数据',
      avator:'',
      Lately:[],
    }
  },
 
  methods:{
...mapState(['pic']),
    ...mapMutations(['addSongList','changeCurrendIndex','changeScreen',"addSong"]),
    back(){
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
      // 点击歌的li 显示播放器
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
        let {albummid,albumname,singer,songmid,songname} =item.data
        let albumUrl=`https://y.gtimg.cn/music/photo_new/T002R300x300M000${albummid}.jpg?max_age=2592000`
        let ab=`http://aqqmusic.tc.qq.com/amobile.music.tc.qq.com/C400${songmid}.m4a?guid=4006735281&vkey=4900BD6BDB5B10F7AF12C53197B1AE56E7576A36A24B7D9F285D04D3F4649EDD2565786CC7A3FE5117BE3EA65E862DC64C86727F4F844830&uin=0&fromtag=38`
       mids.push(songmid)
        return {albummid,albumname,singer,songmid,albumUrl,songname}
      })
      return {result,mids} 
    }
     
  },

  async created(){
    let {ranksong} =this.$route.params
    // 根据歌手mid 发起请求获取数据
    // console.log(this.$route.params);
   
    
    let data = await getRankByMid(ranksong) 
  //  console.log(data);
   
   
    
    
    let {result,mids}= this.handleList(data.songlist) 
    // 通过接口 将mids 歌曲的媒体id 换成 音乐地址 之后将数据进行合并

    let {urls} = await getRankBySong(mids)
    let files=[]
    for (let index = 0; index < result.length; index++) {
     result[index].audioUrl = urls[index]
     files.push( result[index]) 
    }
    
    this.list =files
   this.name = data.topinfo.ListName
   this.avator=`https://y.gtimg.cn/music/photo_new/T002R300x300M000${result[0].albummid}.jpg?max_age=2592000`
    this.$nextTick(()=>{
      this.initBs()
    })
  }
}

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
        left:37%;
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
    }
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
       .cont{
         width: 260px;
         height: 44px;
         float: left;
       }
       .text{
         width: 25px;
         height: 18px;
         float: left;
         color: yellow;
         font-size: @fs-l;
         margin: 13px  30px 0px 0px;
       }
       h2{
        height: 20px;
        font-size: @fs-s;
       }
       span{
        margin-top:3px; 
        height:20px ;
        display: inline-block;
         font-size: @fs-s;
         color: rgba(255,255,255,0.3)
       }
     }
   }
  }
}
</style>