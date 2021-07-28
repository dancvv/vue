// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
//在脚手架中安装axios，采用npm

Vue.prototype.$http=axios; //修改内部的$http为axios $http.get("") .post()
Vue.config.productionTip = false


new Vue({
  el: '#aqq',
  router,
  components: { App },
  template: '<App/>'
})
