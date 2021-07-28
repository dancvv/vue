import Vue from 'vue'
import Router from 'vue-router'
import home from "../components/home";
import student from "../components/student";
import user from "../components/user";
import userAdd from "../components/userAdd";

Vue.use(Router)

export default new Router({
  routes: [

    {
      path:'/',
      component:home
    },
    {
      path:'/user',
      component:user,
      children:[{
        path: 'add', component: userAdd//用户添加路由
      }],
    },
    {
      path:'/student',
      component:student
    },
    // {
    //   path:'/useradd',
    //   component:userAdd
    // },
    ]

})
