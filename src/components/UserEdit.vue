<template>
<div>
  <h2>Edit user info</h2>
  <form action="">
    Name:<input type="text"><br>
    age:<input type="text"><br>
    bir:<input type="text"><br>
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
      this.$http.get("http://rap2api.taobao.org/app/mock/287858/user/one?id="+this.user.id).then(res=>{
        console.log(res.data);
        this.user=res.data;
      })
    },
    editUserInfo(){
      this.$http.post("http://rap2api.taobao.org/app/mock/287858/user/update").then(res=>{
        console.log(res);
        if (res.data.success){
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
