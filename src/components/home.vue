<template>

  <el-container class = "home-container">
    <el-header>
      <img src = "../assets/logo.png" alt = "" width="20px">
      <span id="header" v-show = "!isCollapse">后台管理系统</span>
      <el-button>切换</el-button>
      <el-button type = "danger" @click = "logout" class="header-button">退出</el-button>
    </el-header>
    <el-container>
    <!--侧边栏-->
      <el-aside :width="isCollapse ? '64px':'200px'">
    <!--<el-aside :class="[isCollapse===false?'hidden-md-and-down':'']" :width="isCollapse?'64px':'217px'">-->
      <!--侧边栏菜单区域-->
        <div class="toggle-button" @click="toggleCollapse">切换|||</div>
      <el-menu
          class="el-menu-vertical-demo"
          background-color="#304156"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          :router="true"
          :default-active="activePath">
<!--        default-active="/users"默认使users高亮-->
<!--        开启路由模式-->
<!--          每次只能展开一个-->
<!--        加上空字符串-->
        <el-submenu :index="item.id+''" v-for="item in menulist" :key="item.id">
          <template slot="title">
            <i :class="iconObj[item.id]"></i>
            <span>{{ item.authName }}</span>
          </template>
<!--          二级菜单-->
<!--          subItem.id获取当前id值-->
          <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveNavState('/'+subItem.path)">
            <i class="el-icon-menu"></i>
            {{subItem.id}}
            <span>{{subItem.authName}}</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
      </el-aside>
    <!--右侧区域-->
      <!--头部区域-->
      <!--右侧内容主体区域-->
      <el-main>
        <!--路由占位符-->
        <router-view></router-view>
      </el-main>

  </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      // 左侧菜单数据
      menulist: [],
      iconObj: {
        125: 'el-icon-user',
        103: 'el-icon-s-cooperation',
        101: 'el-icon-s-goods',
        102: 'el-icon-s-order',
        145: 'el-icon-s-data'
      },
      isCollapse: false,
      // 被激活的链接地址
      activePath: '',
      // 面包屑文字
      breadcrumbItem: '',
      breadcrumbSubItem: ''
    }
  },
  created() {
    this.getMenuList()
    //获取激活的index目录值
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 获取左侧所有的菜单
    async getMenuList() {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) {
        //获取失败则返回错误信息
        return this.$message.error(res.meta.msg)
      } else {
        //获取成功
        this.menulist = res.data
        // return this.$message.success(res.meta.msg)
      }
      // console.log('获取左侧所有的菜单------')

      console.log("左侧的菜单"+res)
    },
    // 点击按钮，切换菜单的折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    // 保存链接的激活状态
    saveNavState(activePath, item, subItem) {
      window.sessionStorage.setItem('activePath', activePath)
      console.log("保存的activepath"+activePath)
      this.activePath = activePath
      // 更新面包屑导航文字
      this.breadcrumbItem = item.authName
      this.breadcrumbSubItem = subItem.authName
    }
  }
}
</script>

<style scoped>
.home-container {
  height: 100%;
}
#header{
  padding: 10px;
}
.el-header {
  background-color: #304156;
  display: flex;
  color: white;
  align-items: center;
  font-size: 20px;
  justify-content: flex-start;
  align-items: center;
}
.header-button{
  position: absolute;
  right: 20px;
}

.el-aside {
  background-color: #304156;
  transition: all 0.3s;

}

.el-main {
  background-color: #F0F2F5;
}

.el-menu {
  border-right: none;
}

.iconfont {
  /*处理图标与文本之间的距离*/
  margin-right: 10px;
}

.toggle-button {
  background-color: palevioletred;
  font-size: 14px;
  line-height: 30px;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
