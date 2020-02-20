<template>
  <div class="block-posts">
    <div v-for="(post, index) in posts" v-bind:key="index" class="card-link">
      <article class="blog-card">
        <img class="post-image" :src="'http://localhost:1337'+post.img.url" />
        <div class="article-details">
          <h4 v-for="(item, index) in post.category.split(', ')" v-bind:key="index" class="post-category">{{ item }} </h4>
          <h3 class="post-title">{{ post.name }}</h3>
          <p class="post-date"><b-icon icon="calendar-fill"></b-icon> {{ post.date }}</p>
          <p class="post-description">{{ post.description }}</p>
          <b-button :to="{ name: 'post', params: { id: post.id } }" class="post-btn">Read More</b-button>
          <b-button class="post-btn">Comments</b-button>
          <p class="post-author"><b-icon icon="award"></b-icon> By {{ post.author }}</p>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
/*eslint-disable */
import LiquorTree from 'liquor-tree'
import tree from './dataTree'
export default {
  components: {
    [LiquorTree.name]: LiquorTree
  },
  data() {
    return {
      posts: [],
    };
  },
  methods: {
    axiosStrapiLogged () {
      this.$axios({ url: 'http://localhost:1337/posts', headers: { Authorization: `Bearer ${this.$store.getters.token}`, }, method: 'GET' })
      .then( response => {
      // console.log(response.data);
      // this.posts = response.data
      this.$store.dispatch('SET_NAME', response.data);
      // console.log(this.$store.getters.posts);
      this.posts = this.$store.getters.posts
      // console.log(this.$store.getters.getPostById(3)) 
      })

      // this.$store.dispatch('loadData')
      // this.posts = this.$store.getters.posts
      
    },
    axiosStrapiPublic () {
      this.$axios.get('http://localhost:1337/posts')
      .then( response => {
      this.$store.dispatch('SET_NAME', response.data);
      this.posts = this.$store.getters.posts
      })
    }
  },
  created() {
    if (this.$store.getters.isLoggedIn === true) {
      this.axiosStrapiLogged();
    } else {
      this.axiosStrapiPublic();
    }
  }
};
</script>>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto:400,700");
* {
  box-sizing: border-box;
}
*::before,
*::after {
  box-sizing: border-box;
}

body {
  display: flex;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  color: #777;
  background: #eedfcc;
  font-size: 0.9375rem;
  min-height: 100vh;
  margin: 0;
  line-height: 1.6;
  align-items: center;
  justify-content: center;
  text-rendering: optimizeLegibility;
}

#container {
  width: 30rem;
  height: 13.625rem;
}

.blog-card {
  display: flex;
  flex-direction: row;
  background: #fff;
  box-shadow: 0 0.1875rem 1.5rem rgba(0, 0, 0, 0.2);
  border-radius: 0.375rem;
  overflow: hidden;
}

.post-btn {
  margin-right: 10px;
  background-color: #50c8b9;
  border-color: transparent;
}

.card-link {
  position: relative;
  display: block;
  color: inherit;
  text-decoration: none;
  margin-left: 0 !important;
  margin-bottom: 15px;
  cursor: pointer;
}
.card-link:hover .post-title {
  transition: color 0.3s ease;
  color: #e04f62;
}
.card-link:hover .post-image {
  transition: opacity 0.3s ease;
  opacity: 0.9;
}

.post-image {
  transition: opacity 0.3s ease;
  display: block;
  width: 100%;
  object-fit: cover;
}

.article-details {
  padding: 1.5rem;
}

.post-category {
  font-family: 'Bangers', cursive;
  display: inline-block;
  text-transform: uppercase;
  font-size: 15px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.0625rem;
  margin: 0 0 0.75rem 0;
  margin-right: 10px;
  padding: 0 0 0.25rem 0;
  border-bottom: 0.125rem solid #ebebeb;
}

.post-description {
  font-family: 'Titillium Web', sans-serif;
}

.post-title {
  transition: color 0.3s ease;
  font-size: 25px;
  line-height: 1.4;
  color: #121212;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  // font-family: 'Bangers', cursive;
  font-family: 'Titillium Web', sans-serif;
}

.post-author {
  font-family: 'Titillium Web', sans-serif;
  font-size: 15px;
  font-weight: 700;
  line-height: 1;
  margin: 1.125rem 0 0 0;
  padding: 1.125rem 0 0 0;
  border-top: 0.0625rem solid #ebebeb;
}

.post-date {
  font-family: 'Titillium Web', sans-serif;
  font-size: 15px;
  font-weight: 700;
  line-height: 1;
  // margin: 1.125rem 0 0 0;
  // padding: 1.125rem 0 0 0;
  // border-top: 0.0625rem solid #ebebeb;
}

@media (max-width: 40rem) {
  #container {
    width: 18rem;
    height: 27.25rem;
  }

  .blog-card {
    flex-wrap: wrap;
  }
}
@supports (display: grid) {
  body {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 0.625rem;
    grid-template-areas: ". main main ." ". main main .";
  }

  #container {
    grid-area: main;
    align-self: center;
    justify-self: center;
  }

  .post-image {
    height: 100%;
  }

  .blog-card {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 1fr;
  }

  @media (max-width: 40rem) {
    .blog-card {
      grid-template-columns: auto;
      grid-template-rows: 12rem 1fr;
    }
  }
}
</style>
