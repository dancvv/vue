<template>
  <div id="app">
    <router-link to="/">主页</router-link>
    <router-link to="/user">用户管理</router-link>
    <router-link to="/student">学生管理</router-link>
<!--    <a href="#/user/add">添加</a>-->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

</style>
