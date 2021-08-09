import Vue from "vue";
import Router from "vue-router"
import Login from "../components/Login";
import home from "../components/home";
import welcome from "../components/welcome";
import users from "../components/user/users";
import rights from "../components/power/rights";
import roles from "../components/power/roles";
import cate from "../components/goods/cate";
Vue.use(Router)
const router=new Router({
    routes:[
        {path:'/',redirect:'/login'},
        {path:'/login',component:Login},
        {path:'/home',component:home,redirect:'/welcome',
            children:[
                {path:'/welcome',component:welcome},
                {path:'/users',component:users},
                {path:'/rights',component:rights},
                {path:'/roles',component:roles},
                {path:'/categories',component:cate},
            ]},


    ]
});

//掛載路由導航守卫
router.beforeEach((to, from, next)=>{
//    to将要访问的路径
//    from代表从那个路径跳转而来
//    next是一个函数，表示放行
//    next（） 放行，next（'/login'）强制跳转
    if(to.path==='/login') return next();
//    获取token
    const tokenStr=window.sessionStorage.getItem('token');
    if(!tokenStr) return next('/login');
    next();
})

export default router;
