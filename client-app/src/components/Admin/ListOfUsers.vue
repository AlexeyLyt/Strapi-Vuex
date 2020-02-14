<template>
    <div class="user-list">
        <div>
            Name: {{ user.username }}
            Email: {{ user.email }}
        <span class="delete-user" @click="deleteUser">Удалить</span>
        </div>
    </div>
</template>

<script>
export default {
  name: 'userList',
  props: ['user'],
  components: {
  },
  data () {
    return {
      users: {}
    }
  },
  methods: {
    deleteUser () {
      //   console.log(this.user.comments.length)
      let commentsRelation = this.user.comments
      if (commentsRelation.length > 0) {
        // console.log('est comm')
        commentsRelation.forEach(el => {
          // console.log(el)
          this.$axios({ url: `http://localhost:1337/comments/${el.id}`, headers: { Authorization: `Bearer ${this.$store.getters.token}` }, method: 'DELETE' })
            .then((response) => {
            // success callback
            }, (response) => {
            // error callback
            })
        })
      }
      this.$axios({ url: `http://localhost:1337/users/${this.user.id}`, headers: { Authorization: `Bearer ${this.$store.getters.token}` }, method: 'DELETE' })
        .then((response) => {
          // success callback
          this.$emit('deleted', response.data)
        }, (response) => {
          // error callback
        })
      //   console.log(this.user.id)
    }
  },
  created () {
  }
}
</script>

<style scoped lang="scss">
.delete-user {
    color: red;
    font-weight: bold;
    cursor: pointer;
}
</style>
