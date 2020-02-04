<template>
  <div class="post-card">
    <Header/>
    <CardForPost @viewDetails="updateCart"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import CardForPost from '@/components/CardForPost.vue'

// import Posts from '@/components/Posts.vue'

export default {
  name: 'home',
  components: {
    Header, CardForPost
  },
  data () {
    return {
      posts: []
    }
  },
  methods: {
    updateCart (e) {
      // this.posts.push(e)
      console.log(e)
      // this.total = this.shoppingCartTotal;
    }
  },
  mounted () {
  }
}
</script>
