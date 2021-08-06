<template>
<div>
  <!--  面包屑导航区-->
  <h3>商品分类组件</h3>
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
        <zk-table
            :data="catelist"
            :columns="columns"
            :selection-type="false" :expand-type="false" show-index index-text="NO index" border :show-row-hover="false"></zk-table>

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
      total:'',

      columns:[{
        label:'category title',
        prop:'cat_name'
      }
      ]
    }
  },
  created() {
    this.getCateList()
  },
  methods:{
    async getCateList() {
      const {data: res} = await this.$http.get(`categories`, {params: this.queryInfo})
      if(res.meta.status!==200){
        return this.$message.error("update the catgories failed!")
      }
      console.log(res.data)
      //give the value to the catelist
      this.catelist=res.data.result
      console.log(this.catelist)
      //get the total page
      this.total=res.data.total

    }
  }
}
</script>

<style scoped>

</style>
