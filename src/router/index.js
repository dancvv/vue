import Vue from 'vue'
import Router from 'vue-router'
import home from "../components/home";
import student from "../components/student";
import user from "../components/user";
import userAdd from "../components/userAdd";
import UserEdit from "../components/UserEdit";
import button from "../components/button";
import layout from "../components/layout";
import contaniner from "../components/contaniner";
import element from "../components/element";

Vue.use(Router)

export default new Router({
  routes: [
    {path:'/', component:home},
    {path:'/user', component:user,
      children:[{
        path: 'add', component: userAdd//用户添加路由
        },
        {path:'edit',component:UserEdit},],},
    {path:'/student', component:student},
    {path:'/button', component:button},
    {path:'/layout',component:layout},
    {path:'/container',component:contaniner},
    {path:'/element',component:element}
  ]

})
