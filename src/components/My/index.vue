<template>
    <div class="user">
       <div class='top'>
       <span @click='back'><i class="iconfont icon-zuojiantou"></i></span>
       <ul class="head">
           <li v-for="(item,index) in list" :key="index" @click="change(item)"
            :class="item==seaver?'item':''">{{item}}</li>
       </ul>
        </div>

       <div class="like" v-if="dis">
            <div class="play-btn" @click="likeSui"><i class="iconfont icon-bofang1"></i>随机播放</div>
           <ul class="text">
               <div class='wrapper' ref="wrapper">
               <div class='content'>
               <li v-for="(litem,ind) in like" :key="ind" @click="getLike(ind)">
                   <h2 class="name">{{litem.songname}}</h2>
                   <h2 class="dic" >
                      <span  v-for="(dic,divl) in litem.singer" :key="divl">{{dic.name}}</span>
                   </h2>
               </li>
                  </div>
           </div>
           </ul>
            
       </div>
       <div class="zui" v-else>
            <div class="play-btn" @click="zuiSui"><i class="iconfont icon-bofang1"></i>随机播放</div>
         
             <ul class="text">
                   <div class='wrapper' ref="wrapper">
               <div class='content'>
               <li v-for="(litem,ind) in zui" :key="ind" @click="getZui(ind)">
                   <h2 class="name">{{litem.songname}}</h2>
                   <h2 class="dic">
<span  v-for="(dic,divl) in litem.singer" :key="divl">{{dic.name}}</span>
                   </h2>

               </li>
               </div></div>
           </ul>
               
       </div>
            
    </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
import BS from  'better-scroll'
export default {
    data() {
        return {
            list:['我喜欢的','最近听的'],
             seaver:'我喜欢的',
             dis:true,
             like:[],
             zui:[],
              Lately:[],
        }
    },
    methods: {
         ...mapMutations(['addSongList','changeCurrendIndex','changeScreen',"addSong"]),
        change(item){
            this.seaver=item
            this.dis=!this.dis
        },
        likeSui(){
             this.addSongList(this.like)
        let count  =this.like.length
             let index =parseInt(Math.random()*count)
                               var lt = JSON.parse(localStorage.getItem('play'));
  if(lt){
    lt.push(this.like[index])
    localStorage.setItem('play',JSON.stringify(lt) )
  }else{
   this.Lately.push(this.like[index])
      localStorage.setItem('play',JSON.stringify(this.Lately) )
  }
          this.changeCurrendIndex(index)
          this.changeScreen(true)
        },
         zuiSui(){
             this.addSongList(this.zui)
        let count  =this.zui.length
             let index =parseInt(Math.random()*count)
                    var lt = JSON.parse(localStorage.getItem('play'));
  if(lt){
    lt.push(this.zui[index])
    localStorage.setItem('play',JSON.stringify(lt) )
  }else{
   this.Lately.push(this.zui[index])
      localStorage.setItem('play',JSON.stringify(this.Lately) )
  }
          this.changeCurrendIndex(index)
          this.changeScreen(true)
        },
        back(){
        this.$router.go(-1)
      },
         getLike(ind){
      this.addSongList(this.like)
   var lt = JSON.parse(localStorage.getItem('play'));
  if(lt){
    lt.push(this.like[ind])
    localStorage.setItem('play',JSON.stringify(lt) )
  }else{
   this.Lately.push(this.like[ind])
      localStorage.setItem('play',JSON.stringify(this.Lately) )
  }
      this.changeCurrendIndex(ind)
      // 点击屏幕变大
      this.changeScreen(true)
    },
        getZui(ind){
      this.addSongList(this.zui)
    
                    var lt = JSON.parse(localStorage.getItem('play'));
  if(lt){
    lt.push(this.zui[ind])
    localStorage.setItem('play',JSON.stringify(lt) )
  }else{
   this.Lately.push(this.zui[ind])
      localStorage.setItem('play',JSON.stringify(this.Lately) )
  }
      this.changeCurrendIndex(ind)
      // 点击屏幕变大
      this.changeScreen(true)
    },
    },
    mounted() {
          let wrapper =this.$refs.wrapper
         console.log(this.$refs.wrapper);
         this.bs=new BS(wrapper,{
        click:true,
      })
    },
    created() {
       
         
    
        let like=localStorage.getItem('like')
   this.like=JSON.parse(like)
let zui=localStorage.getItem('play')
this.zui=JSON.parse(zui)
    },
}
</script>
<style lang="less">
    @import '../../style/index.less';
    .user{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #222;
.top{
    position: relative;
    .w(375);
    height: 32px;
    line-height: 32px;
 
    margin: 10px 0px 30px;
    span{
        width: 32px;
        height: 32px;
        display: inline-block;
        i{
             width: 32px;
        height: 32px;
        font-size: 36px;
        color: yellow;
        }
    }
    .head{
        position: absolute;
        top: 0px;
        left:80px;
        li{
            text-align: center;
            line-height: 32px;
          .w(120);
          border: 1px #333 solid;
          height: 32px;  
        
          float: left;
          font-size: 14px;
          color: hsla(0,0%,100%,.3);
        }
        .item{
           background: #333; 
           color:#fff;
        }
    }
}
.like ,.zui{
.play-btn{
        box-sizing: border-box;
    width: 135px;
    margin: 30px auto;
    text-align: center;
    border: 1px solid hsla(0,0%,100%,.5);
    color:hsla(0,0%,100%,.5);
    border-radius: 100px;
    font-size: 12px;
        padding: 5px;
    i{
        margin-right: 5px;
    font-size: 16px;

    }
}
    .text{ 
          .w(310);
 .wrapper{
         top: 143px;
    left: 0;
    right: 0;
    position: fixed;;
    bottom: 0;
 
    overflow: hidden;
    padding: 0 34px;
    .content{
    li{
        .w(310);
        height: 64px;
 .name{
     text-align: left;
    text-overflow: ellipsis;
    overflow: hidden;
    border: 0;
    white-space: nowrap;
    color: #fff;
   font-size: 14px;
        }
 .dic{
      text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin-top: -37px;
            text-align: left;
    color: hsla(0,0%,100%,.3);
    span{
        width: 45px;
   font-size: 14px; }
        }
    }
    }
 }
    }
}
    }

</style>