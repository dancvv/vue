<template>
<div>
  <h2>Edit user info</h2>
  <form action="">
    id:<input type="text" v-model="user.id"><br>
    Name:<input type="text" v-model="user.name"><br>
    age:<input type="text" v-model="user.age"><br>
    bir:<input type="text" v-model="user.bir"><br>
    <input type="button" @click="editUserInfo" value="Edit">
  </form>
</div>
</template>

<script>
export default {
  name: "UserEdit",
  data(){
    return{
      user:{
        id:"",
      }
    }
  },
  methods:{
    findOne(){
      this.$http.get("http://localhost:8089/user/one?id="+this.user.id).then(res=>{
        // console.log(res.data);
        this.user=res.data;
      })
    },
    editUserInfo(){
      // 发送实体对象需要把实体对象加载axios后面
      this.$http.post("http://localhost:8089/user/update",this.user).then(res=>{
        // console.log(res);
        if (res.data.success){
          alert("更新成功")
          this.$router.push("/user");
        }
      })
    }
  },
  created() {
    console.log("edit "+this.$route.query);
    this.user.id=this.$route.query.id;
    this.findOne();
  }
}
</script>

<style scoped>

</style>
