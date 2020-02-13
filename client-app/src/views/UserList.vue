<template>
  <div class="home">
    <Header />
    <!-- <CreatePost v-if="this.$store.getters.isAdmin"/> -->
    <div v-if="this.$store.getters.isAdmin">
        <Users v-for="(user, index) in users" v-bind:key="index" :user="user"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Users from '@/components/Admin/ListOfUsers'
export default {
  name: 'home',
  components: {
    Header,
    Users
  },
  data () {
    return {
      users: {}
    }
  },
  methods: {
    getUsersList () {
      this.$axios({ url: 'http://localhost:1337/users', headers: { Authorization: `Bearer ${this.$store.getters.token}` }, method: 'GET' })
        .then((response) => {
          this.users = response.data
          console.log(response.data)
        //   this.$store.dispatch('SET_USER_API', response.data)
        //   this.users = this.$store.getters.users
        //   this.setNames(this.comment.user)
          // console.log(this.name)
        }, (response) => {
          // error callback
          this.loading = false
        })
    }
  },
  created () {
    // console.log(this.$store.getters.token)
    this.getUsersList()
  }
}
</script>
