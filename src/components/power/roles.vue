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
          <el-row :class="['bdbottom',i1===0?'bdtop':'']" v-for="(item1,i1) in scope.row.children" :key="item1.id" class="vcenter">
<!--            渲染一级权限-->
            <el-col :span="5">
              <el-tag closable @close="removeRightByID(scope.row,item1.id)">{{item1.authName}}</el-tag>
              <i class="el-icon-caret-right"></i>
            </el-col>
<!--            渲染二级权限-->
            <el-col :span="19">
<!--              通过for循环 嵌套渲染二级权限-->
              <el-row :class="[i2===0?'':'bdtop']" v-for="(item2,i2) in item1.children" :key="item2.id" class="vcenter">
                <el-col :span="6">
                  <el-tag type="success" closable @close="removeRightByID(scope.row,item2.id)">{{item2.authName}}</el-tag>
                  <i class="el-icon-caret-right"></i>
                </el-col>
                <el-col :span="18">
                  <el-tag type="warning" v-for="(item3) in item2.children" :key="item3.id" closable @close="removeRightByID(scope.row,item3.id)">{{item3.authName}}{{item3.id}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
<!--          打印输出值-->
<!--          <pre>{{scope.row}}</pre>-->
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
          <el-button type="warning" icon="el-icon-edit" size="mini" @click="showSetRightDialog(scope.row)" >分配权限</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
<!--分配权限的对话框-->
  <el-dialog
      title="分配权限"
      :visible.sync="setRightDialogVisible"
      width="50%"
      @close="setRightDialogClosed">
<!--    属性空间-->
<!--    node-key绑定id值-->
    <el-tree
        :data="rightsLIst"
        show-checkbox
        node-key="id"
        default-expand-all
        ref="treeRef"
        :default-checked-keys="defKeys"
        :props="treeProps">
    </el-tree>
    <span slot="footer" class="dialog-footer">
    <el-button @click="setRightDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="allocateRights">确 定</el-button>
  </span>
  </el-dialog>
</div>
</template>

<script>
export default {
  name: "roles",
  data(){
    return{
    //所有角色列表
      roleList:[],
      //控制与显示分配权限对话框
      setRightDialogVisible:false,
    //  所有权限的数据
      rightsLIst:[],
      //树形控件
      treeProps:{
        label:'authName',
        children:'children'
      },
      //默认选定的树
      defKeys:[],
    //  当前即将分配权限的id
      roleID:'',
    }
  },
  created() {
    this.getRolesList()
  },
  methods:{
    getRolesList(){
      this.$http.get('roles').then(res=>{
        // console.log(res)
        this.roleList=res.data.data
      })
    },
    //根据id删除权限
    async removeRightByID(role, rightId) {
      const confirmType=await this.$confirm('此操作将永久删除该权限，是否继续？','提示',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'
      }).catch(err=>err)
      // 点击确定 返回值为：confirm
      // 点击取消 返回值为： cancel
      if (confirmType !== 'confirm') {
        return this.$message.info('已取消权限删除')
      }else {
        const {data: res}=await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
        console.log("获取到的值")
        console.log(res)
        console.log(res.meta.status)
        if (res.meta.status!==200){
          this.$message.error("删除失败")
        }else {
          this.$message.success("删除成功")
          //此处易出错，返回给的是其children属性
          role.children = res.data
        }
      }
      /*
      我自己的写法，采用this.then.catch结构，但是存在一些问题
      */

      //  弹框是否确认删除
      //   this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //     //  点击确定之后，执行下面的操作
      //   }).then(()=>{
      //     // console.log(role)
      //     this.$message({
      //       type:'success',
      //       message:'删除成功'
      //     });
      //     this.$http.delete(`roles/${role.id}/rights/${rightId}`).then(res=>{
      //       // console.log(role)
      //       // console.log(rightId)
      //       if(res.meta.status!==200){
      //         return this.$message.error('delete success')
      //       }else{
      //         console.log("打印res:")
      //         console.log(res)
      //         // console.log("输出")
      //         this.$message.success("成功删除")
      //         //更新列表
      //         role.children=res.data
      //         console.log("output the deleted data")
      //         console.log(role)
      //       }
      // this.getRolesList()
      //   }).catch(()=>{
      //     this.$message.error("删除失败")
      //   })
      //   //  点击取消之后，执行下面的操作
      // }).catch(()=>{
      //   this.$message({
      //     type:'info',
      //     message:'已取消删除'
      //   });
      // });

      /*
      老师采用的写法，采用异步操作
       */

      // const confirmResult = await this.$confirm(
      //     '此操作将永久删除该权限, 是否继续?',
      //     '提示',
      //     {
      //       confirmButtonText: '确定',
      //       cancelButtonText: '取消',
      //       type: 'warning'
      //     }
      // ).catch(err => err)
      // // 点击确定 返回值为：confirm
      // // 点击取消 返回值为： cancel
      // if (confirmResult !== 'confirm') {
      //   return this.$message.info('已取消权限删除')
      // }
      // const {data: res} = await this.$http.delete(
      //     `roles/${role.id}/rights/${rightId}`
      // )
      // if (res.meta.status !== 200) {
      //   return this.$message.error('删除权限失败！')
      // }
      // role.children = res.data
      //   不建议使用
      // this.getRolesList()
    },
  //  展示权限分配的对话框
    showSetRightDialog(role){
      //把拿到的id值，存为全局变量
      this.roleID=role.id
      //获取所有权限的数据
      this.$http.get('rights/tree').then(res=>{
        // console.log(res)
        if(res.data.meta.status!==200){
          console.log("保存失败")
        }else{
          //获取到的数据，保存
          this.rightsLIst=res.data.data
          //output the list
          // console.log("log the list")
          // console.log(this.rightsLIst)
        }
      })
      //递归获取三级节点的id
      this.getLeafKeys(role,this.defKeys)
      this.setRightDialogVisible=true
    },
  //  通过递归的形式获取三级权限的id
    getLeafKeys(node,arr){
      if(!node.children){
        //如果当前节点不包含children属性，则是三级节点
        return arr.push(node.id)
      }
      node.children.forEach(item=>
      this.getLeafKeys(item,arr))
    },
  //  监听权限分配事件的关闭状态
    setRightDialogClosed(){
      //每次关闭的时候都将其设置为空，防止下次重复调用
      this.defKeys=[]
      // console.log("diaoyong"+this.defKeys)
    },
  //  为角色分配权限
    async allocateRights() {
      const keys = [
        //获取所有的key
        ...this.$refs.treeRef
            .getCheckedKeys(),
        ...this.$refs.treeRef
            .getHalfCheckedKeys()
      ]
      //此处拼接错误是由于上面的位置获取的是节点数据
      //getHalfCheckedKeys，不是当前这个函数
      const idStr = keys.join(',')
      // console.log(idStr)
      const {data: res} = await this.$http.post(`roles/${this.roleID}/rights`, {rids: idStr})
      if(res.meta.status!==200){
        return this.$message.error("分配权限失败")
      }
      this.$message.success("分配权限成功")
      // console.log(keys)
      //重新获取角色列表信息，使得不用在刷新获取
      this.getRolesList()
      this.setRightDialogVisible = false
    }
  }
}
</script>

<style scoped>
.vcenter{
  display: flex;
  align-items: center;
}
</style>
