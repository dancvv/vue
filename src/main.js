<<<<<<< HEAD
import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import router from "./router";
import './assets/gloabl.css';

import axios from 'axios';
//挂载
Vue.prototype.$http=axios;
//配置请求的根路径
axios.defaults.baseURL='http://timemeetyou.com:8889/api/private/v1/'

Vue.use(router);

Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
=======
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//在脚手架中安装axios，采用npm

Vue.use(ElementUI)
Vue.prototype.$http=axios; //修改内部的$http为axios $http.get("") .post()
Vue.config.productionTip = false


new Vue({
  el: '#aqq',
  router,
  components: { App },
  template: '<App/>'
})
>>>>>>> f922580e987a149615dcc6806bff458f8539e2c5
