<template>
<div>
  <!--  面包屑导航区-->
  <h3>用户列表组件</h3>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item :to="{path:'/home'}">商品管理</el-breadcrumb-item>
    <el-breadcrumb-item>商品分类</el-breadcrumb-item>
  </el-breadcrumb>

<!--  卡片分类-->
  <el-card>
    <el-row>
      <el-col>
<!--        表格-->

<!--        分类区-->
      </el-col>
    </el-row>
  </el-card>
</div>
</template>

<script>
export default {
  name: "cate",
  data(){
    return{
      //查询条件
      queryInfo:{
        type:3,
        pagenum:1,
        pagesize:5
      },
      //商品分类的数据列表
      catelist:[],
    }
  },
  created() {
    this.getCateList()
  },
  methods:{
    async getCateList() {
      const {data: res} = await this.$http.get(`categories`, {params: this.queryInfo})

    }
  }
}
</script>

<style scoped>

</style>
