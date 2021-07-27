<template>
  <div id="app">
    <router-link to="/">Home Page</router-link>
    <router-link to="/user">User page</router-link>
    <router-link to="/service">Service page</router-link>
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
