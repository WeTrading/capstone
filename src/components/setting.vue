<template>
  <div class="box">
    <div class="container">
      <div class = left>
        <ul>
          <li>
            User
          </li>
          <li>
            Info
          </li>
          <li>
            Settings
          </li>
        </ul>
      </div>
      <div class = right>
        <el-form  ref = "form" :model = "form" :rules="rules" label-width="50px" class="ruleForm">
          <el-form-item label="Username" label-width="100px" class="input1" prop="name">
            <el-input  v-model="form.name" :placeholder="username" :disabled="nflag"></el-input>
          </el-form-item>
          <el-button type="primary" icon="el-icon-edit" circle @click="edit" class="button1"></el-button>
          <el-form-item label="Email" label-width="100px" class="input2">
            <el-input v-model="form.email" :placeholder="useremail" :disabled="eflag"></el-input>
          </el-form-item>
          <el-button type="primary" icon="el-icon-edit" circle @click="input" class="button2"></el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import * as cd from '../firebase'
import firebase from 'firebase'
export default {
  name: 'setting',
  data: function () {
    return {
      form: {
        name: '',
        email: ''
      },
      userid: firebase.auth().currentUser.uid,
      username: '',
      useremail: firebase.auth().currentUser.email,
      nflag: true,
      eflag: true,
      rules: {
        name: [{ min: 8, max: 20, message: 'Length should between 8-20 characters', trigger: 'blur' }]
      }
    }
  },
  async created () {
    this.username = await this.getName(this.userid)
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
    async getName (userID) {
      const userProfile = await cd.usersCollection.doc(userID).get()
      const data = await userProfile.data()
      return data.name
    },
    edit () {
      if (!this.nflag) {
        const user = firebase.auth().currentUser
        console.log(user)
        if (user) {
          cd.usersCollection.doc(user.uid).update({ name: this.form.name })
          // this.$store.dispatch('logout')
        } else { console.log(0) }
      }
      this.nflag = !this.nflag
    },
    input () {
      if (!this.eflag) {
        const user = firebase.auth().currentUser
        if (user) {
          var regemail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.edu)$/
          if (this.form.email !== '' && regemail.test(this.form.email)) {
            cd.usersCollection.doc(user.uid).update({ email: this.form.email })
            user.updateEmail(this.form.email).then(function () {

            }).catch(function (error) {
              console.log(error)
            })
          } else {
            this.$message({
              message: 'Incorrect Email Format',
              type: 'error'
            })
          }
        }
      }
      this.eflag = !this.eflag
    },
    show () {
      const user = firebase.auth().currentUser
      if (user) { console.log(user) } else { console.log(0) }
    },
    exit () {
      this.$store.dispatch('logout')
      console.log(this.$store.getters.getIsLogin)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>
.box{
  width: 100%;
  height: 100%;
}
.container{
  background-color: #27434d;
  width: 700px;
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
.container .left{
  width: 150px;
  height: 100%;
  float: left;
}
.container .left ul{
  padding-top: 50px;
  padding-left: 0;
}
.container .left ul li{
  list-style-type: none;
  font-family: "Helvetica Neue";
  font-size: xx-large;
  text-align: left;
  margin-left: 20px;
  color: honeydew;
  line-height: 50px;
}
.container .right{
  width: 500px;
  height: 100%;
  background-color: white;
  float: right;
}
.container .right .ruleForm{
  margin-left:0;
  width: 400px;
  padding-left: 30px;
  padding-top:30px;
}
.input1 {
  float: left;
}
.button1{
  float: right;
}
.input2 {
  float: left;
}
.button2{
  float: right;
}
</style>
