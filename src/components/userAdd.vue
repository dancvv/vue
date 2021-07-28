<template>
<div>
  <h2>用户添加信息</h2>
  <form>
    用户名：<input v-model="user.name" type="text"><br>
    年龄：<input v-model="user.age" type="text"><br>
    生日：<input v-model="user.bir" type="text"><br>
<!--    做成子路由-->
    <input type="button" @click="saveUser" value="添加用户信息">
  </form>
</div>
</template>

<script>
export default {
  name: "userAdd",
  data(){
    return{
      user:{},
    }
  },
  methods:{
    saveUser(){
      // console.log(this.user);
    //  发送axios请求
    //  此处出现错误是由于链接请求方式为get
      this.$http.post("http://rap2api.taobao.org/app/mock/287858/user/add",this.user).then(res=>{
        console.log(res)
        if(res.data.success){
          this.$router.push("/user");//切换路由
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
