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
        <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="success" >添加用户</el-button>
      </el-col>
    </el-row>

  </el-card>
</div>
</template>

<script>
export default {
  name: "users"
}
</script>

<style scoped>

</style>
