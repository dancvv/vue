<template>
<div>
<!--  面包屑导航区-->
  <h3>用户列表组件</h3>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
    <el-breadcrumb-item>用户列表</el-breadcrumb-item>
  </el-breadcrumb>

<!--  卡片视图-->
  <el-card class="box-card">
<!--    搜索与添加区域-->
    <el-row :gutter="20">
      <el-col :span="7">
        <el-input placeholder="请输入内容"  class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="success" >添加用户</el-button>
      </el-col>
    </el-row>
<!--    将入边框和斑马条纹-->
    <el-table :data="userList" border stripe>
      <el-table-column label="序号" type="index"></el-table-column>
      <el-table-column label="姓名" prop="username"></el-table-column>
      <el-table-column label="邮箱" prop="email"></el-table-column>
      <el-table-column label="电话" prop="mobile"></el-table-column>
      <el-table-column label="角色" prop="role_name"></el-table-column>
      <el-table-column label="状态" prop="mg_state">
        <el-switch v-model></el-switch>
      </el-table-column>
      <el-table-column label="操作"></el-table-column>
    </el-table>
  </el-card>
</div>
</template>

<script>
export default {
  name: "users",
  data(){
    return{
      queryInfo:{
        query:'',
        pagenum:1,
        pagesize:2
      },
      userList:[],
      total:0,
    }
  },
  created() {
    this.getUserList()
    console.log("print")
  },
  methods:{
    async getUserList(){
      // const {data:res} = this.$http.get('users',{params:this.queryInfo})
      this.$http.get('users',{params:this.queryInfo}).then(res=>{
        console.log("接收到的数据")
        console.log(res)
        if(res.status!==200){
          return this.$message.error("未获取到信息")
        }else{
          this.userList=res.data.data.users;
          this.total=res.data.data.total;
          //获取到的值
          // console.log(this.userList)
          // console.log(this.total)
          return this.$message.success("成功获取")
        }
      }).catch(function (error){
        console.log(error)
      })

      // console.log(res)
    }
  }
}
</script>

<style scoped>

</style>
