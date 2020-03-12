import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './style/rest.css'
import store from './store/index'
import 'animate.css'
import VueLazyload from 'vue-lazyload'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)
Vue.config.productionTip = false
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '/favicon.ico',
  loading: 'http://ustbhuangyi.com/music/img/default.cbc0e020.png',
  attempt: 1
})
new Vue({
  router,store,
  render: h => h(App)
}).$mount('#app')
