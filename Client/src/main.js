// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import MyContainer from '@/components/layout-components/My-Container'
import MyRow from '@/components/layout-components/My-Row'
import MyHeader from '@/components/base-components/My-Header'
import MyFooter from '@/components/base-components/My-Footer'
import MySideBtn from '@/components/base-components/My-Side-Btn'
// 引入自定义的全局样式文件
import './assets/styles/global.css'
// 引入axios
import axios from 'axios'


Vue.config.productionTip = false

// 注册全局组件
Vue.component('my-container', MyContainer)
Vue.component('my-row', MyRow)
Vue.component('my-header', MyHeader)
Vue.component('my-footer', MyFooter)
Vue.component('my-side-btn', MySideBtn)

// 引入element-ui组件库
Vue.use(ElementUI)

// 配置axios
Vue.prototype.$axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
