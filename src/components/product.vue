<template>
    <div class = "goods">
      <ul class="goods_continer">
        <li v-for="item in productlist.slice((currentpage-1)*pagesize,currentpage*pagesize)" :key="item.name">
          <div class="bg">
            <img :src="item.href[item.currentindex]" width="400px" height="400px">
          </div>
          <!--
          <div class="info"><a href="https://google.com">{{item.title}}</a></div>
          -->
          <div>
            <router-link :to="'/product/' + item.key" class="btn btn-primary">{{item.title}}</router-link>
          </div>
        </li>
       </ul>
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="5"
          layout="prev, pager, next"
          :total="countvalue">
        </el-pagination>
      </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'product',
  data: function () {
    return {
      countvalue: 0,
      productlist: [],
      startpage: 1,
      currentpage: 1,
      pagesize: 5
    }
  },
  created () {
    this.getdata()
  },
  methods: {
    getdata () {
      const that = this
      var store = firebase.database().ref('Sell')
      store.on('value', function (snapshot) {
        that.countvalue = snapshot.numChildren()
        snapshot.forEach(function (childSnapshot) {
          var variable = {}
          var url = []
          variable.key = childSnapshot.key
          variable.currentindex = 0
          var pro
          for (pro in childSnapshot.val()) {
            if (pro === 'userID') {
              variable.userid = childSnapshot.val()[pro]
            } else if (pro === 'title') {
              variable.title = childSnapshot.val()[pro]
            } else if (pro === 'discription') {
              variable.discription = childSnapshot.val()[pro]
            } else {
              // url.push(childSnapshot.val()[pro].imageURL)
              if (childSnapshot.val()[pro].highlight === 1) {
                url.splice(0, 0, childSnapshot.val()[pro].imageURL)
                variable.cover = childSnapshot.val()[pro].imageURL
                variable.name = childSnapshot.val()[pro].name
                variable.highlight = childSnapshot.val()[pro].highlight
              } else {
                url.push(childSnapshot.val()[pro].imageURL)
              }
            }
          }
          variable.href = url
          that.productlist.push(variable)
        })
      })
      // console.log(this.productlist)
    },
    handleCurrentChange (val) {
      this.currentpage = val
      console.log(this.currentpage)
    }
  }
}
</script>

<style scoped>
.goods{
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin-left: 150px;
  /* margin-top: 100px; */
}
.goods_continer{
  height: 100%;
}
.goods li{
  list-style-type: none;
  float: left;
  width: 400px;
  height: 450px;
  margin-right: 40px;
  margin-bottom: 40px;
}
.goods .bg{
  float: left;
  width: 400px;
  height: 400px;
}
.goods .info {
  float: left;
  margin-top: 30px;
  text-align: center;
  width: 400px;
  height: 30px;
}
.el-pagination {
  display: block;
  margin-left: 400px;
}
</style>
