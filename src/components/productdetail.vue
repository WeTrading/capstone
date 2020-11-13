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
    <h2>Comments</h2>
    <!--
      display comments here
    -->
    <!--
      add comments here
    -->
    <add-comment :userID='userID' :productID='productID' :sold="true"></add-comment>
  </article>
</template>

<script>
import firebase from 'firebase'
import addComment from './addComment.vue'
export default {
  components: { addComment },
  name: 'productdetail',
  data () {
    return {
      product: [],
      title: {},
      description: {},
      userID: {},
      uploadTime: {},
      productID: {}
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
    }
  }
}
</script>

<style>

</style>
