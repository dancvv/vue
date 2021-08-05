<template>
<div>
<!--  面包屑导航区-->
  <h3>用户列表组件</h3>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item :to="{path:'/home'}">用户管理</el-breadcrumb-item>
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
        <template slot-scope="scope">
<!--          {{scope.row}}-->
<!--          修改-->
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)"></el-button>
<!--          删除-->
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeById(scope.row.id)"></el-button>
<!--          分配-->
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
<!--  修改用户的对话框-->
  <el-dialog
      title="提示"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
      >
    <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名">
        <el-input v-model="editForm.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="editForm.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="editForm.mobile"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="editDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editUserInfor">确 定</el-button>
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
    //  控制修改用户对话框的显示与隐藏
      editDialogVisible:false,
    //  查询到的用户信息对象
      editForm:{},
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
    //  修改表单的验证对象
      editFormRules:{
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
          {min:6,max:20,message: '長度在6~20之間',trigger: 'blur'}
        ],
        mobile:[
          {required:true,message:'請輸入手機號',trigger:'blur'},
          {min:6,max:13,message: '長度在6~10之間',trigger: 'blur'}
        ],
    }
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
    //展示编辑的对话框
    async showEditDialog(id){
      // console.log("获取打印的id:"+id)
      //根据id值查询数据库或者服务器数据
      const {data:res} =await this.$http.get('users/'+id)
        console.log("当前接收状态"+res.meta.status)
        if(res.meta.status!==200){
          this.$message.error('查询用户信息失败！')
        }else{
          this.$message.success('查询用户信息成功！')
          //将查询到的信息复制给目录数据，使得可以全局调用
          this.editForm=res.data;
        }
      this.editDialogVisible=true;
      // console.log(this.editForm)
    },
    //监听修改用户对话框的关闭事件
    editDialogClosed(){
      //清空输入框
      this.$refs.editFormRef.resetFields();
    },
  //  修改用户信息并验证
    editUserInfor(){
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        //  发起用户请求
        //此处没有用this.then.catch结构，因为没有成功的构成
        const {data: res} = await this.$http.put('users/' + this.editForm.id, {
          email: this.editForm.email,
          mobile: this.editForm.mobile
        })
        if (res.meta.status !== 200) {
          return this.$message.error('更新用户信息失败')
        }else{
        //  关闭对话框
        //  刷新数据列表
        //  提示修改成功
          this.editDialogVisible=false
          this.getUserList()
          this.$message.success('更新用户信息成功')
        }
      })
    },
    //根据id删除用户
    removeById(id){
      console.log("删除用户id:"+id)
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      //  点击确定之后，执行下面的操作
      }).then(()=>{
        this.$message({
          type:'success',
          message:'删除成功'
        });
        this.$http.delete('users/'+id).then(()=>{
          // console.log("删除成功：")
          // console.log(res)
          // 删除成功之后获取新的列表
          this.getUserList()
        })
      //  点击取消之后，执行下面的操作
      }).catch(()=>{
        this.$message({
          type:'info',
          message:'已取消删除'
        })
      })
    },
  }
}
</script>

<style scoped>

</style>
