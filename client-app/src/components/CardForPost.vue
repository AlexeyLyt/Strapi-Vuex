<template>
  <div class="card-for-post">
    <div class="card mb-3">
      <img :src="'http://localhost:1337'+post.img.url" class="card-img-top" />
      <div class="card-body">
        <h5 class="card-title">{{ post.name }}</h5>
        <p class="card-text">
          {{ post.description }}
        </p>
        <p class="card-text">
        <small class="text-muted">{{ post.date }}</small>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
/*eslint-disable */
export default {
  components: {},
  data() {
    return {
      post: []
    };
  },
  computed: {
    postId () {
      return Number(this.$route.params.id)
    }
  },
  methods: {
    renderPost () {
      this.$axios.get(`http://localhost:1337/posts`)
      .then( response => {
        // console.log(response.data);
        this.$store.dispatch('SET_NAME', response.data)
        
        // console.log(this.$store.getters.posts)
        this.post = this.$store.getters.getPostByID(this.postId);
        // console.log(this.post);
        console.log(this.post);
      })
    }
  },
  created () {
    this.renderPost()
  }
};
</script>>

<style scoped lang="scss">
.card-img-top {
    height: 30vh;
    object-fit: cover;
}
</style>
