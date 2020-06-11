// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'          //导入vue组件
import App from './App'        //导入App组件
import router from './router'  //导入router组件

import axios from 'axios'      //导入axios组件
import layer from 'vue-layer'  //导入vue-layer(弹框插件)组件


import ElementUI from 'element-ui'            //导入ElementUI组件
import 'element-ui/lib/theme-chalk/index.css' //ElementUI的一个很重要的css

/**
 * 关于axios的功能：
    1，从浏览器中创建XMLHttpRequests
    2，从node.js常见Http请求
    3，支持Promise API
    4，拦截请求和响应
    5，转换请求数据和响应数据
    6，取消请求
    7，自动转换JSON数据
    8，客户端支持防御XSRF
 * @type {AxiosStatic}
 */
Vue.prototype.$axios = axios       //全局注册，使用方法为:this.$axios
Vue.prototype.$layer = layer(Vue)  //vue-layer弹框插件
Vue.use(ElementUI)                 //使用ElementUI组件
Vue.config.productionTip = false   //阻止启动生产消息，常用作指令
                                  /**
                                   * 开发环境下，Vue 会提供很多警告来帮你对付常见的错误与陷阱。
                                   *   而在生产环境下，这些警告语句却没有用，反而会增加应用的体积。
                                   *   此外，有些警告检查还有一些小的运行时开销，这在生产环境模式下是可以避免的。(摘于官网说明)
                                   *   大概意思应该就是，消息提示的环境配置，设置为开发环境或者生产环境
                                   */
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  //render: h => h(App), //配置elementUI
  components: { App },
  template: '<App/>'
})
