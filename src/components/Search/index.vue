<template>
    <div class="search">
        <div class="search-box-wrapper">
<i class="iconfont icon-sousuo"></i>
<input type="search" placeholder="搜索歌曲、歌手" v-model="value"> 

        </div>
      <div class='wrapper' ref="wrapper">
               <div class='content'>
        <div class="hot" v-if="!list.length">
             <h1 class="title">热门搜索</h1>
            <ul>
                <li v-for="(Pitem,rindex) in Popular" :key="rindex" @click="mode(rindex)">
                   {{Pitem.k}}</li>
            </ul>
        </div>
 <ul class="cont" v-else>
                <li v-for="(item,index) in list" :key="index" @click="dataPlay(index)">
                   
                   <p class="text"> <i class="iconfont icon-yinle"></i>{{item.songname}}{{item.singer[0].name}}</p>
                </li>
            </ul>
            <div class="te" v-if="lit.length&&!list.length">
                <h1 class="tit">搜索历史<i @click="clear" class="iconfont icon-iconfontshanchu4
"></i></h1>
                <ul>
                    <li v-for="(ite,ind) in val" :key="ind" ><span @click="md(ind)">{{ite.list}}</span><i class="iconfont icon-shanchu1
" @click="remove(ind)"></i></li>
                </ul>
            </div>
   
    </div>
          </div> 
    <transition enter-active-class="animated slideInRight"
    leave-active-class="animated slideOutRight">
    <router-view></router-view>
    </transition>
          </div>
</template>
<script>
import {getSearchBySong,getPopular,getSongUrlByMid} from '../../api/api'
import { Indicator,Toast,MessageBox,} from 'mint-ui';
import BS from  'better-scroll'
import { mapMutations, mapState } from 'vuex'
export default {
    data() {
        return {
            list:[],
            value:'',
            Popular:[],
            val:'',
            lit:[]
        }
    },
    methods: { 
          ...mapMutations(['addSongList','changeCurrendIndex','changeScreen']),
        dataPlay(index){
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
      this.changeScreen(true)
 
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
    
    
    },
        mode(rindex){
         this.value=this.Popular[rindex].k  
        },
        md(index){
this.value=this.val[index].list
        },
        remove(ind){
           MessageBox({
  title: '提示',
  message: '确定执行此操作?',
  showCancelButton: true,
}).then((res)=>{
if(res == 'confirm'){
 var list = JSON.parse(localStorage.getItem('Popular'));
    list.splice(ind, 1);
    localStorage.setItem('Popular', JSON.stringify(list));
     if(list==''){
this.lit=[]
     }
     let loca= localStorage.getItem('Popular')
  this.val=JSON.parse(loca)
 }
})
        },
        clear(){

    

MessageBox({
  title: '提示',
  message: '确定执行此操作?',
  showCancelButton: true,
}).then((res)=>{
if(res == 'confirm'){
   localStorage.clear()
this.lit=[]
 }
})
        },
        init(){  
 let wrapper =this.$refs.wrapper
    this.bs=  new BS(wrapper,{
        click:true,
  pullDownRefresh: {
          threshold: 50,
          stop: 20
        },
        pullUpLoad: {
          threshold: 50
        }
      })
   getPopular().then((res)=>{
 let obj=[]  
for (let index = 0; index < res.data.hotkey.length; index++) {
    let coutn= res.data.hotkey[index]
 if(index<10){
     obj.push(coutn) 
      }
    this.Popular=obj
}
   })
        }

    },
   watch: {
    value(e){
        if(this.value!=''){
            let cc={list:e}
              this.lit.push(cc)
                   localStorage.setItem('Popular',JSON.stringify(this.lit))
        }
        getSearchBySong(e).then((res)=>{
              let {result,mids}= this.handleList(res.data.song.list) 
  getSongUrlByMid(mids).then((res)=>{
let {urls}=res
 let files=[]
    for (let index = 0; index < result.length; index++) {
     result[index].audioUrl = urls[index]
     if(urls[index]){
     files.push( result[index]) 
     }
    }
      this.list=files
  let loca= localStorage.getItem('Popular')
  this.val=JSON.parse(loca)
  })
})
    }
    },
    mounted() {
         this.init()
    },

}
</script>
<style lang="less" scoped>
@import '../../style/index.less';
@import '../../style/icon/iconfont.css';
.search{
    .wrapper{
         top: 170px;
    left: 0;
    right: 0;
    position: fixed;;
    bottom: 0;

    overflow: hidden;
    .content{
        .cont{
            .w(375);
    padding: 0 30px;
            li{
            .w(315);
           
            height: 16px;
            padding: 0 0 20px;
            .text{
                font-size: @fs-s;
                color: rgba(255, 255, 255, 0.3);
                overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
        } 
        }
       
    }
    }
    .search-box-wrapper{
    .w(325);
    height: 40px;
       background:#333;
border-radius: 6px;
margin: 20px;
padding:0 6px;
box-sizing: border-box;
position: relative;
i{
    width: 24px;
    height: 25px;
     font-size:24px ;
    float: left;
    margin-top: 8px;
    display: inline-block;
  
}
input{
    .w(285);
    position: absolute;
    top: 11px;
    height: 18px;
    background:#333;
// margin: 0 5px;
outline: none;
border: 0;
}
    }
   
    .hot{
         .title{
         .w(335);
         font-size: 14px;
         color: rgba(255, 255, 255, 0.3);
         margin: 0 0 20px;
    }
    .w(335);
    height: 217px;
    margin: 0 20px 20px;
    ul{
    
        li{
        // width: 76px;
        // height: 24px;
        line-height: 24px;
        background: #333;
      float: left;
      padding: 5px 10px;
         font-size: 14px;
text-align: center;
    border-radius: 6px;
            margin-top: 5px;
            color: rgba(255, 255, 255,0.3);
        margin: 0 20px 10px 0px;
    }
} 
    }
    .te{ 
            .w(335);
              margin: 0 20px 20px;
          
        .tit{
         .w(335);
         font-size: 14px;
         color: rgba(255, 255, 255, 0.3);
         margin: 0 0 20px;
         position: relative;
         i{
             width: 34px;
             height: 35px;
            position: absolute;
            right: 0;
             display: inline-block
         }
    }
    li{
         .w(335);
         height: 40px;
         box-sizing: border-box;
         color: rgba(255, 255, 255, 0.3);
     
         margin-top: 2px; 
         line-height: 40px; 
          font-size: 16px;
        position: relative;
       i{
           width: 32px;
           position: absolute;
           height: 36px;

        right: 4px;
    top: -7px;
           display: inline-block;
       }
    }
}}
       
</style>