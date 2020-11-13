<template>
  <div class="page-shopping-cart" id="shopping-cart">
    <h4 class="cart-title">Cart List</h4>
    <div class="cart-product-title">
      <div class="td-product fl">Product</div>
      <div class="td-num fl">Description</div>
      <div class="td-num fl">Amount</div>
      <div class="td-do fl">Operation</div>
    </div>
    <div class="cart-product">
      <table>
        <tbody>
        <tr v-for="item in productlist" :key="item.key" v-show="item.status">
          <td class="td-product fl"><img :src="item.cover" width="98" height="98">
          </td>
          <td class="td-do fl">
            <div class="ccdes">
              <p>Title: {{item.title}}</p>
              <p>Description: {{item.description}}</p>
            </div>
          </td>
          <td class="td-num fl">
            <div>
              <el-input-number v-model="item.want" :min="1" :max="item.amount" label="description"></el-input-number>
            </div>
          </td>
          <td class="td-do fl"><el-button icon="el-icon-delete" round @click="jump(item.key)"></el-button></td>
        </tr>
        </tbody></table>
    </div>
    <div class="cart-product-info">
      <a class="btn-buy fr" href="javascript:;">Check Out</a>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'cart',
  data: function () {
    return {
      content: 0,
      userinfo: firebase.auth().currentUser.uid,
      productlist: []
    }
  },
  created () {
    this.getdata()
  },
  methods: {
    jump (key) {
      var store = firebase.database().ref('Cart/' + this.userinfo + '/' + key)
      store.remove()
      this.$router.replace({ path: '/empty' })
    },
    getdata () {
      var that = this
      var store = firebase.database().ref('Cart/' + this.userinfo)
      store.on('value', function (snapshot) {
        snapshot.forEach(function (childrensnapshot) {
          var productdetails = {}
          productdetails.key = childrensnapshot.key
          productdetails.amount = childrensnapshot.val().amount
          productdetails.want = productdetails.amount
          var db = firebase.database().ref('Sell/' + productdetails.key)
          db.on('value', function (dbshot) {
            dbshot.val()
            if (dbshot.val().sold === true) {
              productdetails.status = false
            } else {
              productdetails.status = true
            }
            var pro
            for (pro in dbshot.val()) {
              if (dbshot.val()[pro].highlight === 1) {
                productdetails.cover = dbshot.val()[pro].imageURL
              }
            }
            productdetails.description = dbshot.val().description
            productdetails.title = dbshot.val().title
          })
          that.productlist.push(productdetails)
        })
      })
    }
  }
}
</script>

<style scoped>
.fl{
  float: left;
}
.fr{
  float: right;
}
a{
  text-decoration: none;
  color: #333;
}
img{vertical-align: middle;}
.page-shopping-cart {
  width: 1200px;
  margin: 50px auto;
  font-size: 14px;
  border: 1px solid #e3e3e3;
  border-top: 2px solid #317ee7; }
.page-shopping-cart .cart-title {
  color: midnightblue;
  font-size: 32px;
  text-align: left;
  padding-left: 50px;
  line-height: 68px; }
.page-shopping-cart {
  color: #e94826; }
.page-shopping-cart .td-product {
  text-align: center;
  width: 250px; }
.page-shopping-cart .td-num{
  text-align: center;
  width: 300px; }
.page-shopping-cart .td-do {
  text-align: center;
  width: 250px; }
.cart-product .td-num{
  padding: 30px 80px;
}
.cart-product .td-product{
  padding: 10px 60px;
}
.cart-product .td-do{
  padding-left: 50px;
  padding-top: 30px;
}
.page-shopping-cart .cart-product-title {
  text-align: left;
  height: 38px;
  line-height: 38px;
  padding: 0 20px;
  background: #f7f7f7;
  border-top: 1px solid #e3e3e3;
  border-bottom: 1px solid #e3e3e3;
}
.page-shopping-cart .cart-product {
  padding: 0 20px;
  text-align: center; }
.page-shopping-cart .cart-product table {
  width: 100%;
  text-align: center;
  font-size: 14px; }
.page-shopping-cart .cart-product table tr {
  border-bottom: 1px dashed #e3e3e3; }
.page-shopping-cart .cart-product table .td-product {
  text-align: left;
  font-size: 12px;
  line-height: 20px; }
.page-shopping-cart .cart-product table .td-product img {
  border: 1px solid #e3e3e3;}
.page-shopping-cart .cart-product-info {
  height: 50px;
  line-height: 50px;
  background: #f7f7f7;
  padding-left: 20px; }
.page-shopping-cart .cart-product-info .btn-buy {
  height: 50px;
  color: #fff;
  font-size: 20px;
  display: block;
  width: 110px;
  background: #ff7700;
  text-align: center;
  margin-left: 30px; }
.page-shopping-cart{
  padding: 20px; }
.ccdes {
  width: 180px;
  height: 100%;
}
</style>
