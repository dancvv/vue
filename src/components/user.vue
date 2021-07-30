<template>

  <div>
    <table border="1">
      <tr>
        <td>编号</td>
        <td>姓名</td>
        <td>年龄</td>
        <td>生日</td>
        <td>操作</td>
      </tr>
      <tr v-for="user in users">
        <td>{{user.id}}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.age }}</td>
        <td>{{ user.bir }}</td>
        <td><a href="javascript:;" @click="delRow(user.id)">删除</a><a :href="'#/user/edit?id='+user.id">修改</a> </td>
      </tr>
    </table>
    <a href="#/user/add">添加</a>
    <router-view></router-view>
  </div>
</template>


<script>
export default {
  name: "user",
  data(){
    let users;
    return{
      users:[]
    }
  },
  methods:{
    findAll(){
      this.$http.get("http://localhost:8089/user/findall").then((res)=>{
        this.users=res.data.results;
      })
    },
    delRow(id){
      console.log(id);
      //此处出现bug是由于delete拼写不完整，与后端路径不匹配
      this.$http.get("http://localhost:8089/user/delete?id="+id).then(res=>{
        console.log(res);
        if(res.data.success){
          alert("删除成功")
          this.findAll();
        }else {
          alert("检查输入")
        }
      })
    }
  },
  components:{},
  created(){
    this.$http.get("http://localhost:8089/user/findall",{
      params:{
        total:1,
        totalpage:1
      }
    }).then((res)=>{
      this.users=res.data.results;
      }
    )
  },
  watch:{ //用来监听
    $route:{
      handler:function (val,oldVal){
        console.log(val);
        if(val.path=='/user'){
          this.findAll();
        }
      },
      deep:true
    }

  }
}
</script>

<style scoped>

</style>
