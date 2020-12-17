<template>
  <div class="box bg">
    <div class="login_container">
      <div class="header">
        <h1>Sign in</h1>
        <a href="#/register" @click="changestatus" class="reg">Register</a>
      </div>
      <div class="right">
        <el-form :model = "loginForm" :rules = "rules" ref = "loginForm" label-width="70px" class="form">
          <el-form-item label="Type" prop="type">
            <el-select v-model="loginForm.type" placeholder="Please Choose the login Type">
              <el-option v-for="item in options" :key="item.value" :label="`${item.type}`" :value="item.type"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label=loginForm.type prop="value">
            <el-input v-model="loginForm.value"></el-input>
          </el-form-item>
          <el-form-item label="PWD">
            <el-input v-model="loginForm.password" type="password"></el-input>
          </el-form-item>
        </el-form>
        <div><button type="primary" @click="login('loginForm')" class="spanbutton">Log In</button></div>
        <div class="forget">
          <a href="#/resetPass" @click="changestatus">Forget Your Password?</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      islog: true,
      loginForm: {
        type: '',
        value: '',
        password: ''
      },
      options: [
        {
          type: 'Email'
        }
      ],
      rules: {
        type: [
          {
            required: true,
            message: 'Please Choose one of the option',
            trigger: 'blur'
          }
        ],
        value: [
          {
            required: true,
            trigger: 'blur'
          }
        ],
        password: [{
          required: true,
          trigger: 'blue'
        }]
      }
    }
  },
  methods: {
    login: function (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.loginForm.value)
          this.$store.dispatch('login', {
            type: this.loginForm.type,
            email: this.loginForm.value,
            password: this.loginForm.password
          })
          // this.$router.push('/home')
          // 补充 dispatch.....
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    changestatus () {
      this.islog = false
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inconsolata&family=Nerko+One&family=Oxygen&display=swap');
.box{
  width: 100%;
  height: 100%;
  font-family: 'Inconsolata', monospace;
  font-family: 'Nerko One', cursive;
  font-family: 'Oxygen', sans-serif;
}
.login_container{
  background-color: white;
  width: 350px;
  height: 500px;
  margin: 30px auto;
  box-sizing: border-box;
  border: 1px solid black;
  border-radius: 20px;
  box-shadow: 0 4px 4px rgba(0,0,0,.4);
  padding: 20px;
}
.login_container .header{
  width: 100%;
  height: 70px;
  padding: 0;
  text-align: left;
}
.header h1{
  float: left;
  padding-top: 20px;
  color: black;
}
.header .reg{
  font-size: 13px;
  float: right;
  margin-right: 20px;
  margin-top: 15px;
  line-height: 30px;
  padding: 3px;
  border-radius: 10px;
  border: 1px solid gray;
}
.header .reg:hover{
  font-weight: bold;
  transform: scale(1.2,1.2);
  box-shadow: 0px 0px 10px rgba(0,0,0,.4);
}
.login_container .right{
  width: 100%;
  height: 400px;
  background-color: white;
  padding-top: 30px;
  color: #27434d;
}
.login_container .right .form{
  width: 300px;
}
.spanbutton {
  background-color: black;
  color: white;
  text-align: center;
  border-radius: 30px;
  width: 100%;
  font-size: large;
  padding: 10px;
}
.forget{
  width: 100%;
  padding-top: 20px;
  text-decoration: none;
  text-align: center;
}
.forget a{
  width: 100%;
}
</style>
