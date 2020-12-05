<template>
    <div>
    <li v-for="item in commentlist.slice((currentpage-1)*pagesize,currentpage*pagesize)" :key="item.commentUUID">
        <v-flex md8 offset-sm3 class="text-center">
        <v-card
            elevation="2"
            outlined
            shaped
            >
              <v-layout col>
                <v-avatar>
                    <img src="https://cdn.vuetifyjs.com/images/john.jpg">
                </v-avatar>
              <v-card-subtitle> <h1>{{item.userName}}</h1> at {{toDate(item.commentTime)}}</v-card-subtitle>
              </v-layout>
              <v-card-text> {{item.commentContent}}</v-card-text>
              <v-col>
              <v-layout justify-center>
                <v-text-field
                :id="item.commentUUID"
                solo
                dense
                rounded
                clearable
                placeholder='Reply to comment ...'
                ></v-text-field>
                <v-btn
                @click="replyToComment(item.userID, item.commentUUID)"
                >
                  Reply
                </v-btn>
              </v-layout>
              </v-col>
        </v-card>
        </v-flex>
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
import * as fb from '../firebase'
import { v4 as uuidv4 } from 'uuid'
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
    async getUserName () {
      const userID = firebase.auth().currentUser.uid
      const name = await this.getName(userID)
      return name
    },
    async replyToComment (userID, commentUUID) {
      const data = document.getElementById(commentUUID).value
      if (!data) {
        return
      }
      const name = await this.getName(userID)
      // append comment to the message
      const message = 'Reply to ' + name + ': ' + data
      const commentID = uuidv4()
      firebase.database().ref('Comments/' + commentID).set({
        userID: firebase.auth().currentUser.uid,
        productID: this.productID,
        commentContent: message,
        commentID: commentID,
        commentTime: Date.now()
      })
      this.setNotification(userID, message)
      // Add commentID to product profile
      const updates = {}
      updates['/comments/' + commentID] = true
      firebase.database().ref('Sell/' + this.productID).update(updates)
    },
    setNotification (userID, replyContent) {
      firebase.database().ref('Notifications/' + userID + '/' + uuidv4()).set({
        type: 'reply',
        userID: firebase.auth().currentUser.uid,
        productID: this.productID,
        commentContent: replyContent,
        commentTime: Date.now()
      })
    },
    toDate (num) {
      const date = new Date(num)
      return date.toLocaleTimeString() + ', ' + date.toDateString()
    },
    async getName (userID) {
      const userProfile = await fb.usersCollection.doc(userID).get()
      const data = await userProfile.data()
      return data.name
    },
    getdata () {
      const that = this
      var store = firebase.database().ref('Sell/' + that.productID + '/comments')
      store.on('value', function (snapshot) {
        that.commentlist = []
        that.countvalue = snapshot.numChildren()
        snapshot.forEach(function (childSnapshot) {
          const variable = {}
          const commentRef = firebase.database().ref('Comments/' + childSnapshot.key)
          variable.commentUUID = childSnapshot.key
          commentRef.once('value').then(async function (snapshot2) {
            variable.commentContent = snapshot2.val().commentContent
            variable.commentTime = snapshot2.val().commentTime
            variable.userID = snapshot2.val().userID
            variable.userName = await that.getName(variable.userID)
            that.commentlist.push(variable)
          })
        })
      })
    },
    handleCurrentChange (val) {
      this.currentpage = val
    }
  }
}
</script>
