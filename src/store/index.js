import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    songList: [],//歌曲列表
    fullScreen: true,//大屏小屏
    currentIndex: -1,//当前正在播放那首歌
    loop: 0,// 0 不循环 1 单曲 2 顺序 3 随机
    pic: '',
    Popular: '',
    Time:0
  },
  mutations: {
    addpic(state,params) { 
      state.pic = params
    },
    seekPlay (state, params) { 
      state.Time=params
    },
    addPopular (state,params) { 
      state.Popular = params
    },
    changeScreen (state, screenState) { 
      state.fullScreen=screenState
    },
    addSongList (state, params) { 
      state.songList = params
    },
    changeCurrendIndex(state,index){
      // 修改当前正在播放那首歌
      state.currentIndex = index 
      
    },
    // 下一曲
    nextCurrendIndex (state) {
      let count = state.songList.length
      if (state.currentIndex < count - 1) {
        state.currentIndex++
      } else { 
        state.currentIndex=0
      }
    },
    //上一曲
    prevCurrendIndex (state) { 
      let count = state.songList.length
      if (state.currentIndex > 0) {
        state.currentIndex--
      } else { 
        state.currentIndex=count-1
      }
    },
    changeLoop (state) { 
      if (state.loop == 3) {
        state.loop = 0
      } else { 
        state.loop++
      }
    }
  },
  actions: {
  
  },
  getters: {
    currentSong(state){
      // 当前正在播放的那首歌
      return state.songList[state.currentIndex]||null
    }
  },
  modules: {
  }
})
