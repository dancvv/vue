<template>
  <div>
    <h1>容器组件的使用</h1>
    <el-container>
      <el-header><div style="border: 1px rebeccapurple solid"><h1>我是標題</h1></div></el-header>
<!--     容器的嵌套使用-->
      <el-container>
        <el-aside style="margin-top: 16px"><div style="border: 1px rebeccapurple solid"><h1>我是菜單</h1></div></el-aside>
        <el-main><h1 style="border: 1px rebeccapurple solid">我是中心內容</h1></el-main>
      </el-container>
      <el-footer><h1>我是頁腳</h1></el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "contaniner"
}
</script>

<style scoped>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
