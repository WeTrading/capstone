<template>
  <article class="col-sm-12">
    <h1>Title: {{ title }}</h1>
    <p>Description: {{ description }}</p>
    <p>UserID: {{ userID }}</p>
    <p>UploadTime: {{ uploadTime }}</p>
    <br>
    <p>Images</p>
    <br>
    <ul>
      <li v-for="item in product" :key="item.name">
        <div>
          <p>Name: {{ item.name }}</p>
          <br>
          <img :src="item.href" width="400px" height="400px">
          <br>
        </div>
      </li>
    </ul>
    <el-button round @click="jump">Add To Cart</el-button>
    <h2>Discussion</h2>
    <displayComment :productID='productID'></displayComment>
    <add-comment :userID='userID' :productID='productID' :sold="true"></add-comment>
  </article>
</template>

<script>
import firebase from 'firebase'
import addComment from './addComment.vue'
import displayComment from './displayComments.vue'
export default {
  components: { addComment, displayComment },
  name: 'productdetail',
  data () {
    return {
      product: [],
      title: {},
      description: {},
      userID: {},
      uploadTime: {},
      productID: {},
      currentUSer: ''
    }
  },
  created () {
    this.loaddata()
  },
  methods: {
    loaddata () {
      const that = this
      var store = firebase.database().ref('Sell/' + this.$route.params.id)
      console.log('Product ID:' + this.$route.params.id)
      that.productID = this.$route.params.id
      store.on('value', function (snapshot) {
        that.title = snapshot.val().title
        that.description = snapshot.val().description
        that.userID = snapshot.val().userID
        that.uploadTime = snapshot.val().uploadTime
        var pro
        for (pro in snapshot.val()) {
          if (pro !== 'userID' && pro !== 'title' && pro !== 'uploadTime' && pro !== 'description') {
            var variable = {}
            variable.name = snapshot.val()[pro].name
            variable.href = snapshot.val()[pro].imageURL
            that.product.push(variable)
          }
        }
      })
      console.log(this.product)
    },
    jump: function () {
      const user = firebase.auth().currentUser
      if (user) {
        this.currentUSer = user.uid
        var that = this
        var database = firebase.database().ref('Cart/')
        var record = 0
        var number = 0
        database.on('value', function (snapshot) {
          var children = snapshot.hasChild(that.currentUSer)
          if (children) {
            var grand = snapshot.child(that.currentUSer).hasChild(that.$route.params.id)
            if (grand) {
              record = 2
              number = snapshot.child(that.currentUSer).child(that.$route.params.id).val().amount + 1
            } else {
              record = 3
            }
          } else {
            record = 4
          }
        })
        console.log(record)
        if (record === 2) {
          console.log(number)
          firebase.database().ref('Cart/' + that.currentUSer + '/' + that.$route.params.id).set({ amount: number })
        } else if (record === 3 || record === 4) {
          firebase.database().ref('Cart/' + that.currentUSer + '/' + that.$route.params.id).set({
            amount: 1
          })
        }
        this.$router.push({ path: '/cart' })
      } else {
        alert('Login First')
      }
    }
  }
}
</script>

<style>

</style>
