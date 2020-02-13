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
      if (this.user.comments.length > 0) {
        console.log('est comm')
        // брать айди каждого коммента и делать запросы через foreach
        this.$axios({ url: `http://localhost:1337/comments/${comment}`, headers: { Authorization: `Bearer ${this.$store.getters.token}` }, method: 'DELETE' })
          .then((response) => {
          //   this.users = response.data
          //   console.log(response.data)
          //   this.$store.dispatch('SET_USER_API', response.data)
          //   this.users = this.$store.getters.users
          //   this.setNames(this.comment.user)
          // console.log(this.name)
          }, (response) => {
            // error callback
            this.loading = false
          })
      }
      this.$axios({ url: `http://localhost:1337/users/${this.user.id}`, headers: { Authorization: `Bearer ${this.$store.getters.token}` }, method: 'DELETE' })
        .then((response) => {
        //   this.users = response.data
        //   console.log(response.data)
        //   this.$store.dispatch('SET_USER_API', response.data)
        //   this.users = this.$store.getters.users
        //   this.setNames(this.comment.user)
        // console.log(this.name)
        }, (response) => {
          // error callback
          this.loading = false
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
