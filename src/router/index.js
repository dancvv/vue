import Vue from 'vue'
import Router from 'vue-router'
import home from '../components/home'
import user from '../components/user'
import service from "../components/service";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/home'
    },
    {
      path:'/home',
      component:home
    },
    {
      path:'/user',
      component:user
    },
    {
      path:'/service',
      component:service
    }
  ]
})
