<template>
    <div class="block-posts">
    <div class="card-link">
      <article class="blog-card">
        <img class="post-image" :src="'http://localhost:1337'+post.img.url" />
        <div class="article-details">
          <h4 class="post-category"> Категории поста </h4>
          <h3 class="post-title"> Заглавие поста </h3>
          <p class="post-date"><b-icon icon="calendar-fill"></b-icon> Дата поста </p>
          <p class="post-description"> Описание поста </p>
          <b-button :to="{ name: 'post', params: { id: post.id } }" class="post-btn">Read More</b-button>
          <b-button class="post-btn">Comments</b-button>
          <p class="post-author"><b-icon icon="award"></b-icon> By {{ post.author }}</p>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal_Adaptive',
  methods: {
  }
}
</script>

<style scoped lang="scss">

</style>
