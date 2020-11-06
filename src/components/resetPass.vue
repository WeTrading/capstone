<template>
<div class="box">
  <div class="resetpass_container">
    <div class="header">
      <H1>Reset Your Password</H1>
    </div>
    <div class="left">
      <p> WELCOME </p>
    </div>
    <div class="right">
      <el-form :model = "resetPassForm" :rules = "rules" ref = "resetPassForm" label-width="80px" class="form">
        <el-form-item label="EMAIL">
          <el-input v-model="resetPassForm.email" type="email"></el-input>
        </el-form-item>
        <el-form-item>
          <span class="button">
            <el-button type="primary" @click="resetpass('resetPassForm')">Reset Password</el-button>
          </span>
          <span class="href">
            <a href="#/Login"> Back </a>
          </span>
        </el-form-item>
      </el-form>
    </div>
    <div class="footer"></div>
  </div>
</div>
</template>

<script>
export default {
  data: function () {
    return {
      resetPassForm: {
        email: ''
      },
      rules: {
        email: [
          {
            required: true,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    resetpass: function (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.resetPassForm.email)
          this.$store.dispatch('resetpass', {
            email: this.resetPassForm.email
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.box{
  width: 100%;
  height: 100%;
}
.resetpass_container{
  background-color: #27434d;
  width: 600px;
  height: 500px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border-radius: 20px;
  box-shadow: 0 4px 4px rgba(0,0,0,.4);
}
.resetpass_container .header{
  width: 100%;
  height: 100px;
  padding: 0;
  text-align: center;
}
.header h1{
  padding-top: 20px;
  color: white;
}
.resetpass_container .left{
  width: 150px;
  height: 300px;
  float: left;
}
.resetpass_container .left p{
  padding-top: 50px;
  padding-left: 10px;
  color: white;
}
.resetpass_container .right{
  width: 450px;
  height: 300px;
  background-color: white;
  float: right;
  border-radius: 30px;
  padding-top: 50px;
  color: #27434d;
}
.resetpass_container .right .form{
  width: 300px;
}
.button{
  width: 150px;
  padding: 10px;
}
.href{
  width: 150px;
  text-decoration: none;
}
</style>
