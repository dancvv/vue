<template>
<div>
  <h1>布局的使用</h1>
  <el-row gutter="10">
    <el-col :span="6"><div style="border:1px aquamarine solid">占用6份</div></el-col>
    <el-col :span="6"><div style="border:1px aquamarine solid">占用6份</div></el-col>
    <el-col :span="6"><div style="border:1px aquamarine solid">占用6份</div></el-col>
    <el-col :span="6"><div style="border:1px aquamarine solid">占用6份</div></el-col>
    <el-col :span="6">占有6份</el-col>
    <el-col :span="6">占有6份</el-col>
    <el-col :span="6">占有6份</el-col>
  </el-row>
</div>
</template>

<script>
export default {
  name: "layout"
}
</script>

<style scoped>

</style>
