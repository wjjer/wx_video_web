// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Frame from './Frame'
import router from './router'
// 引入饿了么的UI框架
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入http请求的vue框架 npm install vue-resource --save
// import VueResource from 'vue-resource'  官方不推荐使用  // Vue.use(VueResource)
import axios from 'axios' // 官方推荐axios
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { Frame },
  template: '<Frame/>'
})
