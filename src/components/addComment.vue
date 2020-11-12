<template>
    <v-container>
        <v-textarea
            label="Description"
            auto-grow
            outlined
            rows="3"
            row-height="15"
            v-model="comment_content"
            :rules="[
              () => !!comment_content || 'This field is required',
              () => !!comment_content && comment_content.length <=200 || 'Comment must be less than 200 characters'
            ]"
            counter=200
            required
        ></v-textarea>
        <v-btn
        :disabled="isDisabled"
        elevation="4"
        @click="post_comment"
        >Add Comment</v-btn>
    </v-container>
</template>

<script>
import firebase from 'firebase'
import { v4 as uuidv4 } from 'uuid'
export default {
  name: 'addComment',
  data () {
    return {
      product_uuid: null,
      comment_time: null,
      comment_content: null,
      comment_uuid: uuidv4()
    }
  },
  props: [
    'user_uuid'
  ],
  computed: {
    isDisabled: function () {
      return !this.comment_content
    }
  },
  methods: {
    postComment () {
      firebase.database().ref('Sell/' + this.productUUID).set({})
      this.productInfo.userID = this.userID
      this.productInfo.title = this.title
      this.productInfo.description = this.description
      this.productInfo.sold = false
      this.productInfo.uploadTime = Date.now()
      for (const key in this.imgs) {
        const img = this.imgs[key]
        this.uploadImageData(img.name, img.data, this)
      }
      // add this product info into user profile
      this.addProductToUser()
    }
  }
}
</script>
