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
        <template slot-scope="scope">
<!--          自定义插槽-->
<!--          {{scope.row}}-->
          <el-switch v-model="scope.row.mg_state"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180px">
<!--        <template slot-scope="scope">-->
        <template >
<!--          {{scope.row}}-->
          <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
          <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
            <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
          </el-tooltip>

        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 3, 5]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
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
        //当前的页数
        pagenum:1,
        //当前每页显示多少条
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
    },
  //  监听pagesize改变的事件
    handleSizeChange(newSize){
      // console.log(newSize)
      //根据获取的新值设置
      this.queryInfo.pagesize=newSize;
      //重新请求数据
      this.getUserList()
    },
    //监听页码值改变的事件
    handleCurrentChange(newPage){
      console.log(newPage)
      this.queryInfo.pagenum=newPage
      this.getUserList()
    }
  }
}
</script>

<style scoped>

</style>
