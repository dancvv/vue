<template>
<div class="login_set">
  <div class="login_box">
    <img src="../assets/logo.png" width="100">
<!--    登录表单区域-->
<!--    loginFormRef表单的实例-->
<!--    访问实例-->
    <el-form :model="loginForm" :rules="loginFormRules" ref="loginFormRef" label-width="0px" class="login_form">
      <el-form-item prop="username">
        <el-input prefix-icon="el-icon-user-solid" v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input prefix-icon="el-icon-lock" v-model="loginForm.password" type="password"></el-input>
      </el-form-item>

      <el-form-item class="btns">
        <el-button type="primary" @click="login">登录</el-button>
        <el-button type="info" @click="resetLoginForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</div>
</template>

<script>
export default {
  name: "Login",
  data(){
    return{
      //登录表单数据
      loginForm:{
        username:"admin",
        password:"123456"
      },
    //  表单的验证规则
      loginFormRules:{
        username:[
          {required:true,message:"请输入登录名",trigger:"blur"},
          {min:3,max:10,message: "长度在3~10个字符",trigger: "blur"}],
        password: [
          {required:true,message:"请输入登录密码",trigger:"blur"},
          {min:6,max:10,message: "长度在6~10个字符",trigger: "blur"}
        ]
      }
    }
  },
  methods:{
    //点击重置按钮，重置登录表单
    resetLoginForm(){
      //打印实例对象
      // console.log(this);
      //重置表单
      this.$refs.loginFormRef.resetFields();
    },
    //表单预验证
    login(){
      //表單預驗證，檢測輸入是否符合格式要求
      this.$refs.loginFormRef.validate(async (valid)=>{
        // console.log(valid)
        if(!valid) return;
        //发送表单数据,返回的是promise
        const {data:res} = await this.$http.post('login',this .loginForm);
        //打印接收的數據
        console.log(res);
        if(res.meta.status!==200){
          //判斷不成功，執行語句
          // alert("wrong password or error user name")
          // return console.log("error");
          return this.$message.error('error message')
        }else {
          console.log("success")
          //保存token
          window.sessionStorage.setItem("token",res.data.token);
          this.$router.push("/home");
          return this.$message.success('success message')
        }
      });
    }
  },

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
