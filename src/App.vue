<template>
  <div id="app">
    <router-link to="/">主页</router-link>
    <router-link to="/user">用户管理</router-link>
    <router-link to="/student">学生管理</router-link>
<!--    <a href="#/user/add">添加</a>-->
    <a href="#/button">点击显示按钮</a>
    <a href="#/layout">layout布局</a>
    <a href="#/container">容器布局组件</a>
    <a href="#/element">小項目實踐</a>
    <br>

    <router-view></router-view>

  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
