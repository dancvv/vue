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
<!--        clearable 清除输入框-->
<!--        @clear 清除事件，调用某个方法-->
        <el-input placeholder="请输入内容" v-model="queryInfo.query" class="input-with-select" clearable @clear="getUserList">
          <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="success" @click="addDialogVisible = true">添加用户</el-button>
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
          <el-switch v-model="scope.row.mg_state" @change="userStateChange(scope.row)"></el-switch>
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
<!--  添加用戶的對話框-->
  <el-dialog
      title="添加用戶"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed">
<!--    內容主體區-->
<!--    添加表單-->
    <el-form :model="addForm" :rules="addruleForm" ref="addFormRef"
             label-width="70px">
      <el-form-item label="用戶名" prop="username">
<!--        此處報錯是由於加入的驗證規則addruleForm-->
        <el-input v-model="addForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密碼" prop="password">
        <el-input v-model="addForm.password">de</el-input>
      </el-form-item>
      <el-form-item label="郵箱" prop="email">
        <el-input v-model="addForm.email"></el-input>
      </el-form-item>
      <el-form-item label="手機" prop="mobile">
        <el-input v-model="addForm.mobile"></el-input>
      </el-form-item>
    </el-form>
<!--    底部區域-->
    <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addUser">确 定</el-button>
  </span>
  </el-dialog>
</div>
</template>

<script>
export default {
  name: "users",
  data(){
    //驗證郵箱
    //使用正則表達式
    // var checkEmail = (rule, value, callback) => {
    //   if (!value) {
    //     return callback(new Error('年龄不能为空'));
    //   }
    //   setTimeout(() => {
    //     if (!Number.isInteger(value)) {
    //       callback(new Error('请输入数字值'));
    //     } else {
    //       if (value < 18) {
    //         callback(new Error('必须年满18岁'));
    //       } else {
    //         callback();
    //       }
    //     }
    //   }, 1000);
    // };
    return{
      //查询到的分页信息，根据这个显示分页
      queryInfo:{
        query:'',
        //当前的页数
        pagenum:1,
        //当前每页显示多少条
        pagesize:2
      },
      userList:[],
      total:0,
      //控制添加用戶對話框的顯示與隱藏
      addDialogVisible:false,
    //  添加用戶的表單數據
      addForm:{
        username:'',
        password: '',
        email:'',
        mobile:'',
      },
    //  添加表單的驗證規則對象
      addruleForm:{
        username:[
          {required:true,message:'請輸入用戶名',trigger:'blur'},
          {min:3,max:10,message: '用戶名的長度在3~10之間',trigger: 'blur'}
        ],
        password:[
          {required:true,message:'請輸入密碼',trigger:'blur'},
          {min:6,max:10,message: '用戶名的長度在6~10之間',trigger: 'blur'}
        ],
        email:[
          {required:true,message:'請輸入郵箱',trigger:'blur'},
          //  加入验证规则
          // { validator: validatePass, trigger: 'blur' },
          {min:6,max:10,message: '長度在6~10之間',trigger: 'blur'}
        ],
        mobile:[
          {required:true,message:'請輸入手機號',trigger:'blur'},
          {min:6,max:10,message: '長度在6~10之間',trigger: 'blur'}
        ],
      },
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
      // console.log(newPage)
      this.queryInfo.pagenum=newPage
      this.getUserList()
    },
    //监听switch开关的状态
    userStateChange(userinfo){
      console.log(userinfo)
      // this.$http.put('users/:uid/state/:type')
      this.$http.put(`users/${userinfo.id}/state/${userinfo.mg_state}`).then(res=>{
        // console.log(res)
        if(res.data.meta.status!==200){
          //如果切换失败，为了确保状态不变，加入取反机制
          userinfo.mg_state=!userinfo.mg_state
          return this.$message.error("更新用户状态失败")
        }else {
          return this.$message.success("更新用户状态成功")
        }
      })
    },
    //监听添加用户对话框的关闭事件
    addDialogClosed(){
      //不添加这句话会导致每次打开的表单都是一样的
      this.$refs.addFormRef.resetFields();
    },
    addUser(){
      this.$refs.addFormRef.validate(valid=>{
        // console.log(valid)
        if(valid === true){
        //  可以发起添加用户的网络请求
          this.$http.post('users',this.addForm).then(res=>{
            // console.log("状态码")
            // console.log(res.data.meta.status)
            if(res.data.meta.status!==201){
              this.$message.error("添加用户失败")
            }else {
              this.$message.success("添加用户成功")
              //隐藏添加用户的对话框
              this.addDialogVisible=false
            //  重新获取用户列表
              this.getUserList()
            }
          })
        }else {
          return
        }
      })
    },
  }
}
</script>

<style scoped>

</style>
