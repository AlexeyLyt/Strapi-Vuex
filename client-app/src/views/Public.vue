<template>
  <div class="home">
    <Header/>
    <Posts/>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Posts from '@/components/Posts.vue'

export default {
  name: 'home',
  components: {
    Header, Posts
  }
}
</script>
