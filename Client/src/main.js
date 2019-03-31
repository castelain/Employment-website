// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import router from './router'
import http from './http'
import MyContainer from '@/components/layout-components/My-Container'
import MyRow from '@/components/layout-components/My-Row'
import MyHeader from '@/components/base-components/My-Header'
import MyFooter from '@/components/base-components/My-Footer'
import MySideBtn from '@/components/base-components/My-Side-Btn'
import MyPatter from '@/components/base-components/My-Patter'
import MyBanner from '@/components/base-components/My-Banner'
import MyCard from '@/components/base-components/My-Card'
import MyFieldset from '@/components/base-components/My-Fieldset'
import MyListItem from '@/components/base-components/My-List-Item'
import MyInnerNav from '@/components/base-components/My-Inner-Nav'
import MyTitle from '@/components/base-components/My-Title'
import MyTabs from '@/components/base-components/My-Tabs'
import MySteps from '@/components/base-components/My-Steps'
import MyPagination from '@/components/base-components/My-Pagination'
// 引入自定义的全局样式文件
import './assets/styles/global.css'

Vue.config.productionTip = false
Vue.prototype.$http = http

// 注册全局组件
Vue.component('my-container', MyContainer)
Vue.component('my-row', MyRow)
Vue.component('my-header', MyHeader)
Vue.component('my-footer', MyFooter)
Vue.component('my-side-btn', MySideBtn)
Vue.component('my-patter', MyPatter)
Vue.component('my-banner', MyBanner)
Vue.component('my-card', MyCard)
Vue.component('my-fieldset', MyFieldset)
Vue.component('my-list-item', MyListItem)
Vue.component('my-inner-nav', MyInnerNav)
Vue.component('my-title', MyTitle)
Vue.component('my-tabs', MyTabs)
Vue.component('my-steps', MySteps)
Vue.component('my-pagination', MyPagination)

// 注册全局过滤器
// 字符串截取，超出的部分用......代替
Vue.filter('formateStr', function(str, number){
  if(str.length > Number(number)){
    return str.slice(0, Number(number)) + '......';
  }else{
    return str;
  }
})

// 引入element-ui组件库
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
