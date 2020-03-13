import Vue from 'vue'
import VueRouter from 'vue-router'
const Recommend = ()=>import('../components/Recommend')
const Singer = ()=>import('../components/Singer/index.vue')
const Rank = ()=>import('../components/Rank')
const My = ()=>import('../components/My')
const Search = ()=>import('../components/Search')
const Detail = ()=>import('../components/detail/index.vue')
const RankSong = ()=>import('../components/RankSong/index.vue')
const recommendList = ()=>import('../components/recommendList/index.vue')
Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  routes:[
    {
      path: '/Recommend',
      component:Recommend,
      children: [
        {
          name: 'recommendList',
          path: ':recommendList',
          component:recommendList
      } ]
    },
    {
      path: '/Singer',
      component: Singer,
      children: [
        {
          name: 'detail',
          path: ':singermid',
          component:Detail
      } ]
    },
    {
      path: '/Rank',
      component: Rank,
      children: [
        {
          name: 'ranksong',
          path: ':ranksong',
          component:RankSong
      }
     
      ]
    },
    {
      path: '/My',
      component:My
    },
    {
      path: '/Search',
      component: Search,
  
    },
    {
      path:'/',
      redirect:'/recommend'
    }
  ]
})
export default router
