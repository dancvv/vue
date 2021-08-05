<template>
<div>
  <!--  面包屑导航区-->
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>角色列表</el-breadcrumb-item>
  </el-breadcrumb>
<!--  卡片视图-->
  <el-card>
<!--    添加角色按钮-->
    <el-row>
      <el-col>
        <el-button type="primary">添加用户</el-button>
      </el-col>
    </el-row>
<!--    角色列表区域-->
    <el-table :data="roleList" border stripe>
      <el-table-column type="expand">
<!--        获取子列表-->
        <template slot-scope="scope">
          <el-row :class="['bdbottom',i1===0?'bdtop':'']" v-for="(item1,i1) in scope.row.children" :key="item1.id">
<!--            渲染一级权限-->
            <el-col :span="5">
              <el-tag>{{item1.authName}}</el-tag>
              <i class="el-icon-caret-right"></i>
            </el-col>
<!--            渲染二级权限-->
            <el-col :span="19"></el-col>
          </el-row>
          <pre>{{scope.row}}</pre>
        </template>
      </el-table-column>
<!--      索引列-->
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column label="角色名称" prop="roleName"></el-table-column>
      <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-search" size="mini" @click="scope">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
          <el-button type="warning" icon="el-icon-edit" size="mini">分配权限</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>

</div>
</template>

<script>
export default {
  name: "roles",
  data(){
    return{
    //所有角色列表
      roleList:[]
    }
  },
  created() {
    this.getRolesList()
  },
  methods:{
    getRolesList(){
      this.$http.get('roles').then(res=>{
        console.log(res)
        this.roleList=res.data.data
      })
    }
  }
}
</script>

<style scoped>

</style>
