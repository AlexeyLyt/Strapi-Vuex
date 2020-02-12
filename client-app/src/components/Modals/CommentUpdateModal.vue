<template>
    <modal
      name="comment-update-modal"
      transition="nice-modal-fade"
      :min-width="200"
      :min-height="200"
      :delay="100">
    <div class="example-modal-content">
      <textarea
        class="textarea-comment-update"
        placeholder="Your comment..."
        required
        v-model="$store.getters.comment.text"
      >
      </textarea>
      <button @click="this.updateComment" >Изменить</button>
    </div>
    <button class="modal-close" @click="this.close">Закрыть</button>
  </modal>
</template>
<script>
export default {
  name: 'Modal_Draggable',
  data () {
    return {
      text: ''
    }
  },
  methods: {
    close () {
      this.$modal.hide('comment-update-modal')
    },
    updateComment () {
      let commentText = document.querySelector('.textarea-comment-update').value
      let data = {
        text: commentText,
        post: { id: this.$route.params.id },
        user: { id: this.$store.getters.userId }
        // commentId: this.comment.id
      }
      // console.log(document.querySelector('.textarea-comment-update').value)
      if (commentText === '') {
        alert('Поле не может быть пустым')
      } else {
        this.$store.dispatch('commentUpdate', data)
          .then(response => {
          // success callback
          // fire event for comment
            this.$emit('commented', response.data)
            this.$modal.show('comment-update-succeed')
            // Clear the message
            this.loading = false
          },
          response => {
            // error callback
            this.loading = false
          })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.example-modal-content {
    padding: 15px;
    text-align: center;
    display: grid;
}
.modal-close {
    display: inline-block;
    width: 100%;
    border: none;
    background-color: white;
    color: #5a6876;
    font-weight: bold;
    border-top: 2px solid #0000001f;
    padding: 5px;
}
.textarea-comment-update {
  margin-bottom: 10px;
}
</style>
