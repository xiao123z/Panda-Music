<template>
    <div class="singers">
        <div class="wrapper" ref="wrapperSinger">
            <div class="content">      
            <ul>
<li v-for="(item,index) in singer" :key="index" :ref='item.Findex'>
 <h3>{{item.Findex}}</h3>
<ol>
    <li v-for="(Sitem,Sindex) in item.list" 
    :key="Sindex"  
      @click='goDetail(Sitem.Fsinger_mid)'>
    <img v-lazy="Sitem.avator">
    <span>{{Sitem.Fsinger_name}}</span>
    </li>
</ol>
                </li>
                </ul>
            </div>
        </div>
           <div class='quicklist'>
      <ul 
        @touchstart='touchStart'
        @touchmove='touchMove'
        @touchend='touchEnd'
      >
        <li v-for="(item,index) in quickData" 
            :key="index"
           
            :class='selFindex==item?"sel":""'>
          {{item}}
        </li>
      </ul>
    </div>
    <transition enter-active-class="animated slideInRight"
    leave-active-class="animated slideOutRight">
    <router-view></router-view>
    </transition>
     
    </div>
</template>
<script>
import {SingerData} from 'api/api'
import BS from 'better-scroll'
import {nomalData} from '../Singer/index'
import { mapMutations } from 'vuex'
export default {
data() {
    return {
     
        singer:[],
         selFindex:'hot',
    }
},
    methods: {
//  ...mapMutations(['changeNam']),
      goDetail(singermid){
    //  this.changeNam(data)
  this.$router.push(`/singer/${singermid}`)
      },
          touchStart(e){       

      let y = e.touches[0].pageY
      let startCount=parseInt((y-140)/18)
      this.touch.y=y
      this.touch.startCount=startCount
    },
    touchMove(e){
      let moveY =e.touches[0].pageY
      let moveDis=moveY-this.touch.y //计算出移动过的距离
      let count =parseInt(moveDis/18) //获取移动过的格子数
     
      let moveIndex =this.touch.startCount + count  //获取下标
       if(moveIndex<0||moveIndex>this.quickData.length-1){ return false}
      let moveFindex =this.quickData[moveIndex]
      this.quickJump(moveFindex)
    },
    touchEnd(){
    
    },
    quickJump(item){
      // 点击每一项之后 触发事件需要知道点到谁了
      // 根据字母获取到固定的元素
      let dom = this.$refs[item][0]
      // console.log('点到我了',item,dom)
      // //  用bs 内部的方法直接跳转到固定元素
      this.Bs.scrollToElement(dom)
    },
        init(){
            let wrapper=this.$refs.wrapperSinger
this.Bs=new BS(wrapper,{probeType:3,click:true})
   let distance=[]
 for (const key in this.$refs) {
          if(key!=='wrapperSinger'){
            distance.push(this.$refs[key][0].offsetTop)
          }
      }
        this.Bs.on('scroll',(pos)=>{
      let y =Math.abs(pos.y)
    
      // 判断每一次滚动的距离在什么范围内
      let scrollIndex = 0 //滚动所在区域的下标
      for (let index = 0; index < distance.length; index++) {
          if(y>=distance[index]&&y<distance[index+1]){
            scrollIndex=index
          }else if(y>=distance[distance.length-1]){
          //  最后的边界判断
            scrollIndex = distance.length-1
          }
      }
        
      // 根据下标换字母
      let scrollFindex=this.quickData[scrollIndex]
     
      this.selFindex=scrollFindex
    })
        }

    },
 created() {
      this.touch={y:0}
     SingerData().then((res)=>{   
let data=nomalData(res.data.list)
this.singer=data

this.$nextTick(()=>{
    this.init()
})
     })
 },   
 computed: {
     quickData(){
         let result=this.singer.map((item)=>{
             return item.Findex
         })
         return result
     }
 },
}
</script>
<style lang="less" scoped>
@import '../../style/index.less';
.singers{
  position: fixed;
  top:88px;
  bottom: 0px;
  left:0px;
  right: 0px;
  .quicklist{
    position: absolute;
    right: 10px;
    top:40px;
    width: 20px;
    background: rgba(0,0,0,.3);
    font-Size:@fs-xs;
    padding: 20px 0 20px;
    color:rgba(255,255,255,.5);
    border-radius:10px; 
    text-align: center;
    ul{
      li{
        width: 20px;
        height: 18px;
      }
      .sel{
        color: @yellow;
      }
    }
  }
  .wrapper{
    height: 100%;  
    // background: red;
    overflow: hidden;
    .content{
      .w(375);
      h3{
        height: 30px;
        line-height: 30px;
        background: #333;
        color:rgba(255,255,255,0.5);
        font-size: @fs-s;
        padding-left:20px;
         

      }
      ol{
        li{
          .w(375);
          height: 70px;
          // background: pink;
          box-sizing: border-box;
          padding: 20px 0px 0px 30px;
          display: flex;
          align-items: center;
          img{
            width: 50px;
            height: 50px;
            border-radius:25px; 
          }
          span{
            padding-left:20px; 
            display: inline-block;
            height: 50px;
            line-height: 50px;
            font-size: @fs-s;
            color:rgba(255,255,255,.5);
          }
        }
      }
    }
    }
}
</style>