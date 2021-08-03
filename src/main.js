import Vue from 'vue'
import App from './App.vue'
import ElementUI, {Message} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import router from "./router";
import './assets/gloabl.css';

import axios from 'axios';
//挂载
Vue.prototype.$http=axios;
//配置请求的根路径
// axios.defaults.baseURL='http://timemeetyou.com:8889/api/private/v1/'
axios.defaults.baseURL='http://www.ysqorz.top:8888/api/private/v1/'
//message自定義屬性，需要進行配置
Vue.prototype.$message=Message

Vue.use(router);

Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
