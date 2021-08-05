<template>
<div>
<!--  面包屑导航区-->
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>权限列表</el-breadcrumb-item>
  </el-breadcrumb>
<!--  卡片区域-->
  <el-card>
<!--    数据来源-->
    <el-table :data="rightsList" border stripe>
      <el-table-column type="index"></el-table-column>
      <el-table-column label="权限名称" prop="authName"></el-table-column>
      <el-table-column label="路径" prop="path"></el-table-column>
      <el-table-column label="权限等级" prop="level">
<!--        注册标签美化-->
        <template slot-scope="scope">
          <el-tag v-if="scope.row.level==='0'">一级</el-tag>
          <el-tag type="success" v-else-if="scope.row.level==='1'">二级</el-tag>
          <el-tag type="warning" v-else>三级</el-tag>
        </template>
      </el-table-column>

    </el-table>
  </el-card>
</div>
</template>

<script>
export default {
  name: "rights",
  data(){
    return{
      //权限列表
      rightsList:[],
    }
  },
  created() {
    this.getRightsList()
  },
  methods:{
    getRightsList(){
      this.$http.get('rights/list').then(res=>{
        //获取权限信息
        // console.log(res);
        this.rightsList=res.data.data;
        this.$message.success("获取成功")
      }).catch(()=>{
        this.$message.error("获取失败")
      })
    }
  }
}
</script>

<style scoped>

</style>
