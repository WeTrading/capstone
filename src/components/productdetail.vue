<template>
  <article class="col-sm-12">
    <ul class="photo">
      <li v-for="item in product" :key="item.name">
        <div>
          <br>
          <img :src="item.href" width="400px" height="400px" class="pho">
          <br>
        </div>
      </li>
    </ul>
    <v-card
      class="mx-auto"
      max-width="400"
      outlined
    >
      <v-list-item three-line>
        <v-list-item-content>
          <h1>
            Product Detail
          </h1>
          <v-list-item-title class="headline mb-1">
            Title: {{title}}
          </v-list-item-title>
          <v-list-item-title class="headline mb-1">
            Seller: {{ userName }}
          </v-list-item-title>
          <v-list-item-subtitle>Posted at: {{ toDate(uploadTime) }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-card-actions>
        <v-btn
          outlined
          rounded
          text
          @click="jump"
          :disabled="judge"
        >
          Add To Cart
        </v-btn>
      </v-card-actions>
    </v-card>
    <h2>Discussion</h2>
    <displayComment :productID='productID'></displayComment>
    <add-comment :userID='userID' :productID='productID' :sold="true"></add-comment>
  </article>
</template>

<script>
import firebase from 'firebase'
import addComment from './addComment.vue'
import displayComment from './displayComments.vue'
import * as fb from '../firebase'
export default {
  components: { addComment, displayComment },
  name: 'productdetail',
  data () {
    return {
      product: [],
      title: {},
      description: {},
      userID: {},
      userName: {},
      uploadTime: {},
      productID: {},
      currentUSer: '',
      info: '',
      judge: true
    }
  },
  created () {
    this.loaddata()
  },
  methods: {
    toDate (num) {
      const date = new Date(num)
      return date.toLocaleTimeString() + ', ' + date.toDateString()
    },
    async getName (userID) {
      const userProfile = await fb.usersCollection.doc(userID).get()
      const data = await userProfile.data()
      console.log('Name: ' + data.name)
      return data.name
    },
    loaddata () {
      this.info = this.$route.params.id
      const user = firebase.auth().currentUser.uid
      const that = this
      var store = firebase.database().ref('Sell/' + this.$route.params.id)
      console.log('Product ID:' + this.$route.params.id)
      that.productID = this.$route.params.id
      store.once('value', async function (snapshot) {
        that.title = snapshot.val().title
        that.description = snapshot.val().description
        that.userID = snapshot.val().userID
        that.userName = await that.getName(snapshot.val().userID)
        that.uploadTime = snapshot.val().uploadTime
        var pro
        for (pro in snapshot.val()) {
          if (pro !== 'userID' && pro !== 'title' && pro !== 'uploadTime' && pro !== 'description' && pro !== 'sold' && pro !== 'price' && pro !== 'comments' && pro !== 'amount') {
            var variable = {}
            variable.name = snapshot.val()[pro].name
            variable.href = snapshot.val()[pro].imageURL
            that.product.push(variable)
          }
        }
      })
      if (user === this.userID) {
        this.judge = true
      } else {
        this.judge = false
      }
      // console.log(this.product.length)
    },
    jump: function () {
      const user = firebase.auth().currentUser
      if (user) {
        this.currentUSer = user.uid
        var that = this
        var database = firebase.database().ref('Cart/')
        database.once('value').then(function (snapshot) {
          var children = snapshot.hasChild(that.currentUSer)
          if (children) {
            var grand = snapshot.child(that.currentUSer).hasChild(that.info)
            if (grand) {
              // number = snapshot.child(that.currentUSer).child(that.$route.params.id).val().amount
              var number = parseInt(snapshot.child(that.currentUSer).child(that.info).val().amount + 1)
              return { option: 0, val: number }
            } else if (grand === false) {
              return { option: 1, val: 0 }
            }
          } else {
            return { option: 1, val: 0 }
          }
        }).then(function (object) {
          console.log(object.option, object.val)
          if (object.option === 0) {
            // var number = parseInt(firebase.database().ref('Cart/' + that.currentUSer + '/' + that.$route.params.id).val().amount + 1)
            firebase.database().ref('Cart/' + that.currentUSer + '/' + that.$route.params.id).update({ amount: object.val })
          } else if (object.option === 1) {
            firebase.database().ref('Cart/' + that.currentUSer + '/' + that.$route.params.id).set({
              amount: 1
            })
          }
        })
        this.$message({
          showClose: true,
          message: 'Add to Cart',
          type: 'success'
        })
      } else {
        this.$message({
          showClose: true,
          message: 'Login First Please',
          type: 'warning'
        })
      }
    }
  }
}
</script>

<style scoped>
.photo {
  list-style-type: none;
  display: inline-block;
  margin-right: 50px;
}
.pho {
  border: 1px solid black;
  border-radius: 20px;
  box-shadow: 10px 10px 5px #888888;
}
ul li {
  float: left;
  margin-right: 50px;
}
.mx-auto {
  margin-top: 30px;
  margin-bottom: 30px;
}
h1 {
  font-size: x-large;
}
</style>
