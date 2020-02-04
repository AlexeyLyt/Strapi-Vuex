<template>
  <li transition="slide">
    <div class="profile">
      <img :src="avatar" alt />
    </div>
    <div class="msg">
      <div class="msg-body">
        <p class="name">
          {{ comment.name }}
          <span class="date">{{ comment.created_at }}</span>
        </p>
        <p v-html="comment.text"></p>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: ['comment'],
  computed: {
    avatar () {
      return (
        'https://api.adorable.io/avatars/48/' +
        this.comment.name
          .toString()
          .toLowerCase()
          .trim()
          .replace(/[\s\W-]+/g, '-') +
        '@adorable.io.png'
      )
    }
  },
  created () {
    // console.log(this.props.comment.length)
  }
}
</script>
