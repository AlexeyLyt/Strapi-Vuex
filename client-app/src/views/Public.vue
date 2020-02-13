<template>
  <div class="home">
    <Header />
    <CreatePost v-if="this.$store.getters.isAdmin"/>
    <Posts />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Posts from '@/components/Posts.vue'
import CreatePost from '@/components/Admin/AiPostCreate.vue'

export default {
  name: 'home',
  components: {
    Header,
    Posts,
    CreatePost
  },
  created () {
    // console.log(this.$store.getters.token)
  }
}
</script>
