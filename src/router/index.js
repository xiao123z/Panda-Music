import Vue from 'vue'
import VueRouter from 'vue-router'
// import Recommend from '../components/Recommend'
// import Singer from '../components/Singer/index.vue'
// import Rank from '../components/Rank'
// import My from '../components/My'
// import Search from '../components/Search'
// import Detail from '../components/detail/index.vue'
// import RankSong from '../components/RankSong/index.vue'
const Recommend = ()=>import('../components/Recommend')
const Singer = ()=>import('../components/Singer/index.vue')
const Rank = ()=>import('../components/Rank')
const My = ()=>import('../components/My')
const Search = ()=>import('../components/Search')
const Detail = ()=>import('../components/detail/index.vue')
const RankSong = ()=>import('../components/RankSong/index.vue')
Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  routes:[
    {
      path: '/Recommend',
      component:Recommend
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
