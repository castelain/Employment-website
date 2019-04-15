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
import SingleBanner from '@/components/base-components/Single-Banner'
// 引入自定义的全局样式文件
import './assets/styles/global.css'

// 引入日期转换格式的插件 moment.js
import Moment from 'moment'
Moment.locale('zh-cn')

Vue.config.productionTip = false
Vue.prototype.$http = http

// 引入MD5
import crypto from 'crypto'

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
Vue.component('single-banner', SingleBanner)

// 注册全局过滤器
// 字符串截取，超出的部分用......代替
Vue.filter('formateStr', function(str, number){
  if(str.length > Number(number)){
    return str.slice(0, Number(number)) + '......';
  }else{
    return str;
  }
})

// 转换日期格式为2018-9-11
Vue.filter('formatTime', function (rawTime) {
  return Moment(rawTime).format('YYYY-MM-DD')
})
// 计算指定时间与当前时间的时间差
Vue.filter('relativeTime', function (beforeTime) {
  return Moment(beforeTime).fromNow()
})

// 性别数值到字符串的转换
Vue.filter('formatSex', function(sex){
  if(sex === 0) {
    return '男';
  }else if(sex === 1) {
    return '女';
  }else if(sex === 2) {
    return '保密';
  }
})

// 政治状态值到字符串的转换
Vue.filter('formatPoliticalStatus', function(status){
  if(status === 0) {
    return '已婚';
  }else if(status === 1) {
    return '未婚';
  }else if(status === 2) {
    return '保密';
  }
})

// 定义全局函数
// 转换日期格式为2018-9-11
Vue.prototype.formatTime = function(rawTime) {
  return Moment(rawTime).format('YYYY-MM-DD')
}

// 字符串截取，超出的部分用......代替
Vue.prototype.formateStr = function(str, number) {
  if(str.length > Number(number)){
    return str.slice(0, Number(number)) + '......';
  }else{
    return str;
  }
}

// 将数组转换为字符串
Vue.prototype.arrToStr = function(arr, i) {
  return arr.join(i);
}

// 将审核状态值转为字符串
Vue.prototype.formateStatus = function(status) {
    if (status === 0) {
      return '待审核'
    } else if (status === 1) {
      return '审核通过'
    } else {
      return '审核不通过'
    }
}

// 密码加密函数
Vue.prototype.setMd5 = function(rawPassword, salt) {
  let md5 = crypto.createHash('md5')
  md5.update(rawPassword + ':' + salt)
  return md5.digest('hex')
}

// 引入element-ui组件库
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
