<template>
    <v-container>
        <v-textarea
            label="Comment"
            auto-grow
            outlined
            rows="3"
            row-height="15"
            v-model="commentContent"
            :rules="[
              () => !!commentContent || 'This field is required',
              () => !!commentContent && commentContent.length <=200 || 'Comment must be less than 200 characters'
            ]"
            counter=200
            required
        ></v-textarea>
        <v-btn
        :disabled="isDisabled"
        elevation="4"
        @click="postComment"
        >Add Comment</v-btn>
    </v-container>
</template>

<script>
import firebase from 'firebase'
import * as fb from '../firebase'
import { v4 as uuidv4 } from 'uuid'
// import { component } from 'vue/types/umd'
export default {
  name: 'addComment',
  data () {
    return {
      commentContent: null
    }
  },
  props: {
    userID: {
      type: String,
      required: true
    },
    productID: {
      type: String,
      required: true
    },
    sold: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    isDisabled: function () {
      return !this.commentContent
    }
  },
  methods: {
    async postComment () {
      const commentID = uuidv4()
      console.log({
        userID: this.userID,
        productID: this.productID,
        commentContent: this.commentContent,
        commentID: commentID
      })
      firebase.database().ref('Comments/' + commentID).set({
        userID: this.userID,
        productID: this.productID,
        commentContent: this.commentContent,
        commentID: commentID,
        commentTime: Date.now()
      })
      // Add commentID to user profile
      const userProfile = await fb.usersCollection.doc(this.userID).get()
      const data = userProfile.data()
      if ('comments' in data) {
        const oldComments = data.comments
        await oldComments.push(commentID)
        fb.usersCollection.doc(this.userID).update({
          comments: oldComments
        })
      } else {
        fb.usersCollection.doc(this.userID).update({
          comments: [commentID]
        })
      }
      // Add commentID to product profile
      let productPath = 'Sell/'
      if (this.sold !== true) {
        productPath = 'Sold/'
      }
      const updates = {}
      updates['/comments/' + commentID] = true
      firebase.database().ref(productPath + this.productID).update(updates)
    }
  }
}
</script>
