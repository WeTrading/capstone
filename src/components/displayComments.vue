<template>
    <div>
    <li v-for="item in commentlist.slice((currentpage-1)*pagesize,currentpage*pagesize)" :key="item.commentID">
        UserID:{ {{item.userID}} }, UserComment: { {{item.commentContent}} }, Comment Time: { {{item.commentTime}} }
    </li>
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
  name: 'displayComments',
  data: function () {
    return {
      countvalue: 0,
      commentlist: [],
      startpage: 1,
      currentpage: 1,
      pagesize: 5
    }
  },
  props: {
    productID: {
      type: String,
      required: true
    }
  },
  created () {
    this.getdata()
  },
  methods: {
    getdata () {
      const that = this
      var store = firebase.database().ref('Sell/' + that.productID + '/comments')
      store.on('value', function (snapshot) {
        var tempcommentlist = []
        that.countvalue = snapshot.numChildren()
        snapshot.forEach(function (childSnapshot) {
          var variable = {}
          variable.key = childSnapshot.key
          console.log(variable.key)
          var commentRef = firebase.database().ref('Comments/' + childSnapshot.key)

          commentRef.once('value').then(function (snapshot2) {
            variable.userID = snapshot2.val().userID
            variable.commentContent = snapshot2.val().commentContent
            variable.commentTime = snapshot2.val().commentTime
            tempcommentlist.push(variable)
          })
        })
        that.commentlist = tempcommentlist
      })
      console.log(this.commentlist)
    },
    handleCurrentChange (val) {
      this.currentpage = val
      console.log(this.currentpage)
    }
  }
}
</script>
