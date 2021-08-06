import Vue from 'vue'
import App from './App.vue'
import ElementUI, {Message} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import ZkTable from "vue-table-with-tree-grid"
//need to install the plugin
//npm i vue-table-with-tree-grid -S

//config the treetable
Vue.use(ZkTable)

import router from "./router";
import './assets/gloabl.css';

import axios from 'axios';
//挂载
Vue.prototype.$http=axios;
//配置请求的根路径
// axios.defaults.baseURL='http://timemeetyou.com:8889/api/private/v1/'
axios.defaults.baseURL='http://www.ysqorz.top:8888/api/private/v1/'
//通过接口获取菜单数据
axios.interceptors.request.use(config => {
  //打印配置对象
  // console.log("打印配置对象")
  // console.log(config)
  //添加对象
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config;
});

//message自定義屬性，需要進行配置
Vue.prototype.$message=Message



Vue.use(router);

Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
