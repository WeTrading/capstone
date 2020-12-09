<template>
  <el-container class="continer">
    <el-header class="header">
      <p>WeTrading Market</p>
      <a href="#/Login" v-show="!isLogin" class="button">Sign in</a>
      <a  href="#/product" @click="changelogout" v-show="isLogin" class="button">Logout</a>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <Header class="side"></Header>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Header from './header'
import Login from './Login'
export default {
  name: 'home2',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Header
  },
  data: function () {
    return {
      log: false
    }
  },
  computed: {
    isLogin: function () {
      return this.$store.getters.getIsLogin
    },
    current: function () {
      return this.$store.getters.getCurrent
    }
  },
  methods: {
    changelogin () {
      this.log = true
    },
    changelogout () {
      this.log = false
      this.$store.state.isLogin = false
      this.$store.dispatch('logout')
      console.log(this.$store.getters.getIsLogin)
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nerko+One&display=swap');
.continer{
  height: 100%;
}
.el-header {
  background-color: white;
}
p{
  color: rgb(255,108,53);
  font-size: xx-large;
  line-height: 60px;
  float: left;
  font-family: 'Nerko One', cursive;
}
a {
  font-size: large;
  float: right;
  font-weight: bold;
  line-height: 60px;
  margin-right: 50px;
  color: rgb(34,34,34);
  font-family: 'Nerko One', cursive;
}
.el-aside{
  width: 200px;
  background-color: white;
}
.el-main{
  background-color: white;
}
</style>
