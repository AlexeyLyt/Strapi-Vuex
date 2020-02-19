<template>
  <li transition="slide">
    <div class="profile">
      <img :src="avatar" alt />
    </div>
    <div class="msg">
      <div class="msg-body">
        <p class="name">
          {{ upperCase }}
          <span class="date">
            <span>Создан: {{ moment(`${comment.created_at}`, ["YYYY", moment.ISO_8601]).format('LLL') }}</span><br>
            <span v-if="moment(comment.created_at).format('LLL') === moment(comment.updated_at).format('LLL')"></span>
            <span v-else>Изменен: {{ moment(`${comment.updated_at}`, ["YYYY", moment.ISO_8601]).format('LLL') }}</span>
          </span>
        </p>
        <p class="comment-text" v-html="comment.text"></p>
        <span class="update-comment" v-if="Number(this.$store.getters.userId) === comment.user && this.$store.getters.isLoggedIn" @click="this.CommentUpdate">Изменить</span>
        <span class="delete-comment" v-if="Number(this.$store.getters.userId) === comment.user && this.$store.getters.isLoggedIn" @click="this.CommentDelete">Удалить</span>
        <span v-else></span>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: ['comment'],
  data () {
    return {
      users: [],
      name: '',
      loading: false
    }
  },
  computed: {
    avatar () {
      return (
        'https://api.adorable.io/avatars/48/' +
        this.name
          .toString()
          .toLowerCase()
          .trim()
          .replace(/[\s\W-]+/g, '-') +
        '@adorable.io.png'
      )
    },
    upperCase () {
      return this.name.charAt(0).toUpperCase() + this.name.slice(1)
    }
  },
  methods: {
    setNames (e) {
      this.users.forEach(el => {
        if (el.id === e) {
          this.name = el.username
        }
      })
    },
    renderNamesPublic () {
      this.$axios.get('http://localhost:1337/users').then((response) => {
        this.$store.dispatch('SET_USER_API', response.data)
        this.users = this.$store.getters.users
        this.setNames(this.comment.user)
        // console.log(this.name)
      }, (response) => {
        // error callback
        this.loading = false
      })
    },
    renderNamesLogged () {
      this.$axios({ url: 'http://localhost:1337/users', headers: { Authorization: `Bearer ${this.$store.getters.token}` }, method: 'GET' })
        .then((response) => {
          this.$store.dispatch('SET_USER_API', response.data)
          this.users = this.$store.getters.users
          this.setNames(this.comment.user)
        // console.log(this.name)
        }, (response) => {
        // error callback
          this.loading = false
        })
    },
    CommentDelete () {
      let data = this.comment.id
      // console.log(data)
      this.loading = true
      this.$store.dispatch('commentDelete', data)
        .then(response => {
          // success callback
          // fire event for comment
          // console.log(response.data)
          this.$emit('commented', response.data)
          // Clear the message
          this.loading = false
          this.$modal.show('comment-delete-modal')
        },
        response => {
          // error callback
          this.loading = false
        })
    },
    CommentUpdate () {
      let data = {
        id: this.comment.id,
        text: this.comment.text
      }
      // console.log(this.comment.text)
      this.$store.dispatch('SET_COMMENT_TEXT_API', data)
      this.$store.dispatch('SET_COMMENT_ID_API', this.comment.id)
      console.log(this.$store.getters.commentId)
      // console.log(this.$store.getters.commentText)
      this.$modal.show('comment-update-modal')
    }
  },
  created () {
    if (this.$store.getters.isLoggedIn === true) {
      this.renderNamesLogged()
    } else {
      this.renderNamesPublic()
    }
  }
}
</script>

<style lang="scss" scoped>
.msg {
  border: 2px solid #00000047;
}
.date {
  text-align: right;
}
.update-comment,
.delete-comment {
  float: right;
  margin-bottom: 10px;
  margin-left: 15px;
  color: #47b784;
  font-weight: bold;
  font-size: .8em;
  text-decoration: underline;
  cursor: pointer;
}
.comment-text {
  margin-bottom: 0 !important;
}
.date-updated {
  float: right;
}
</style>
