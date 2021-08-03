<template>
<div class="login_set">
  <div class="login_box">
    <img src="../assets/logo.png" width="100">
<!--    登录表单区域-->
    <el-form label-width="0px" class="login_form">
      <el-form-item>
        <el-input prefix-icon="el-icon-user-solid"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input prefix-icon="el-icon-lock"></el-input>
      </el-form-item>
      <el-form-item class="btns">
        <el-button type="primary">登录</el-button>
        <el-button type="info">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</div>
</template>

<script>
export default {
  name: "Login"
}
</script>

<style scoped>
.login_set{
  background: palevioletred;
  height: 100%;
}
.login_box{
  width: 450px;
  height: 400px;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  background: aliceblue;
  /*实现div的居中*/
  transform: translate(-50%,-50%);
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.btns{
  display: flex;
  justify-content: flex-end;
}
.login_form{
  position: absolute;
  bottom: 60px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>
