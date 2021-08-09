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
        <el-button type="primary" @click="showAddDialog">添加用户</el-button>
<!--        表格-->
        <zk-table class="treetable"
            :data="catelist"
            :columns="columns"
            :selection-type="false" :expand-type="false"
            show-index index-text="NO index" border :show-row-hover="false">
<!--          是否有效-->
          <template slot="isok" slot-scope="scope">
            <i class="el-icon-success" v-if="scope.row.cat_deleted===false"
            style="color: lightgreen"></i>
            <i class="el-icon-error" v-if="scope.row.cat_deleted===true"
               style="color: red"></i>
          </template>
<!--          排序-->
          <template slot="order" slot-scope="scope">
            <el-tag type="primary" size="mini" v-if="scope.row.cat_level===0">一级</el-tag>
            <el-tag type="success" size="mini" v-else-if="scope.row.cat_level===1">二级</el-tag>
            <el-tag type="warning" size="mini" v-else>三级</el-tag>
          </template>
<!--          操作-->
          <template slot="opt" slot-scope="scope">
<!--            在此处获取当前id值，传给下一个-->
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEdit(scope.row.cat_id)">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteCate(scope.row.cat_id)">删除</el-button>
          </template>
        </zk-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.pagenum"
            :page-sizes="[3, 5, 10, 15]"
            :page-size="queryInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
<!--        分类区-->
      </el-col>
    </el-row>
  </el-card>
<!--  添加分类的对话框-->
  <el-dialog
      :visible.sync="addDialogVisible"
      width="50%" @close="addCateDialogClosed">
<!--    添加分类的表单-->
    <el-form :model="addCateForm" :rules="addCateFormRules"
    ref="addCateFormRef" label-width="100px">
      <el-form-item label="分类名称：" prop="cat_name">
        <el-input v-model="addCateForm.cat_name"></el-input>
      </el-form-item>
      <el-form-item label="父级分类：">
<!--        options:指定数据源-->
<!--        v-model="value"这个value指向props的value-->
        <el-cascader
            v-model="selectedKeys"
            :options="parentCateLIst"
            :props="{ expandTrigger: 'hover' ,value:'cat_id',label:'cat_name',children:'children' }"
            @change="ParentCateChange"
            filterable clearable></el-cascader>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addCate">确 定</el-button>
  </span>
  </el-dialog>
<!--  修改分类的对话框-->
  <el-dialog
      title="提示"
      :visible.sync="EditDialogVisible"
      width="50%">
    <el-form
        :model="addCateForm"
        :rules="addCateFormRules"
        ref="editCateFormRef"
        label-width="100px"
    >
      <el-form-item label="分类名称：" prop="cat_name">
        <el-input v-model="addCateForm.cat_name">{{addCateForm.cat_name}}</el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="EditDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="confirmEdit">确 定</el-button>
  </span>
  </el-dialog>
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
      //总共有多少条数据
      total:0,

      columns:[{
        label:'category title',
        prop:'cat_name',
      },{
        label: '是否有效',
        type:'template',
        //表示当前这一列使用的模板名称
        template:'isok'
      },
        {
          label: '排序',
          type:'template',
          //表示当前这一列使用的模板名称
          template:'order'
        },
        {
          label: '操作',
          type:'template',
          //表示当前这一列使用的模板名称
          template:'opt'
        },
      ],
      //控制对话框的显示与隐藏
      addDialogVisible:false,
    //  添加分类的表单数据对象
      addCateForm:{
      //  将要添加分类的名称
        cat_name:'',
      //  父级分类的id
        cat_id:0,
      // 分类的登记，默认要添加的是1级分类
        cat_level:0,
      },
      addCateFormRules:{
        cat_name:[
          {required:true,message:'请输入分类名称',trigger:'blur'}
        ]
      },
      //父级分类的列表
      parentCateLIst:[],
      //级联选择器v-model的值
      selectedKeys:[],
      //选择项可以有的值
      // cascaderList:[{
      //   value:'',
      //   label:'',
      //   children:'',
      // }],
      EditDialogVisible:false
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
      // console.log(res.data)
      //give the value to the catelist
      this.catelist=res.data.result
      // console.log(this.catelist)
      //get the total page
      this.total=res.data.total
      // console.log(this.total)
    },
  //  监听pagesize变化
    handleSizeChange(newsize){
      this.queryInfo.pagesize=newsize
      this.getCateList()
    },
    //监听pagenum改变值
    handleCurrentChange(newPage){
      this.queryInfo.pagenum=newPage
      this.getCateList()
    },
    //展示对话框
    showAddDialog(){
      //先获取父级分类数据，在展示对话框
      this.getParamCateList()
      this.addDialogVisible=true
    },
    //获取父级分类的数据列表
    async getParamCateList() {
      const {data: res} = await this.$http.get('categories', {
        params: {
          type: 2
        }
      })
      if (res.meta.status !== 200) {
        return this.$message.error('获取父级分类失败')
      }
      //打印输出值
      // console.log(res.data)
      this.parentCateLIst=res.data

    },
    //选择项发生变化时触发这个函数
    ParentCateChange(){
      // console.log(this.parentCateLIst)
      console.log(this.selectedKeys.length)
    //  如果v-model中的值length大于0，证明选中的父级分类
    //  反之，则没有选中任何分类
      if(this.selectedKeys.length>0){
        //父级id
        this.addCateForm.cat_pid=this.selectedKeys[this.selectedKeys.length-1]
      //为当前分类的等级赋值
      this.addCateForm.cat_level=this.selectedKeys.length
      return 0
      }else {
        this.addCateForm.cat_id=0
        this.addCateForm.cat_level=0
      }
      console.log(this.addCateForm)
    },
  //  添加新的分类
    addCate(){
      console.log(this.addCateForm)
      this.$refs.addCateFormRef.validate(async valid => {
        if (!valid) return
        const {data: res} = await this.$http.post('categories', this.addCateForm)
        console.log(res)
        console.log(this.addCateForm)
        if(res.meta.status!==201){
           return this.$message.error('添加分类失败')
         }
        this.$message.success('添加分类成功')

        await this.getCateList()
        this.addDialogVisible = false
      })

    },
  //  监听对话框的关闭事件，重置表单数据
    addCateDialogClosed(){
      this.selectedKeys=[]
      this.addCateForm.cat_id=0
      this.addCateForm.cat_level=0
      // this.addCate.cat_name=0
      this.$refs.addCateFormRef.resetFields()
    },
  //  删除分类
    async deleteCate(id) {
      const confirmText = await this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err=>err)
      if(confirmText!=='confirm'){
        return this.$message.info('已取消删除！')
      }
      const {data:res}=await this.$http.delete('categories/'+id)
      // console.log(id)
      if(res.meta.status!==200){
        return this.$message.error('删除失败')
      }
      this.$message.success('删除分类成功')
      this.getCateList()
    },
    //展示编辑结果
    async showEdit(id) {
      const {data: res} = await this.$http.get("categories/" + id)
      console.log(res)
      if (res.meta.status!==200){
        return this.$message.error("获取分类信息失败")
      }
      this.$message.success("获取分类信息成功")
      this.addCateForm=res.data
      console.log(this.addCateForm)
      this.EditDialogVisible = true
    },
    //确认编辑事件
    confirmEdit(){
      this.$refs.editCateFormRef.validate(async valid => {
        if (!valid) return this.$message.error('取消编辑分类')
        const {data: res} = await this.$http.put('categories/' + this.addCateForm.cat_id,{
          cat_name:this.addCateForm.cat_name
        })
        console.log(this.addCateForm)
        console.log(res)
        if(res.meta.status!==200){
          return this.$message.error('编辑提交更新失败')
        }
        this.$message.success('编辑提交更新成功')
      })
      //更新分类列表
      this.getCateList()
      //关闭对话窗口
      this.EditDialogVisible=false
    }
  }
}
</script>

<style scoped>
.treetable{
  margin-top: 15px;
}
.el-cascader{
  width: 100%;
}
</style>
