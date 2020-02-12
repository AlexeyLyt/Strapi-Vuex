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
    <CommentForm v-if="this.$store.getters.isLoggedIn" v-on:commented="updateComment" />
    <p v-else @click="$modal.show('login')" class="comment-notlogged">Зарегистрируйтесь или войдите для того, чтобы оставить комментарий</p>
    <div class="comment-list">
      <span v-show="loading" class="spinner"></span>
        <ul>
          <div v-if="this.noCommentsYet === true">Комментариев ещё нет</div>
          <comment v-else v-for="(comment, index) in comments" v-bind:key="index" :comment="comment" v-on:commented="updateComment"></comment>
        </ul>
    </div>
    <CommentModal />
    <CommentDeleteModal />
    <CommentUpdateModal v-on:commented="updateComment" />
    <CommentUpdateSucceed />
  </div>
</template>

<script>
import CommentForm from '@/components/Comments/CommentForm.vue'
import Comment from '@/components/Comments/Comment.vue'
import CommentModal from '@/components/Modals/CommentModal.vue'
import CommentDeleteModal from '@/components/Modals/CommentDeleteModal.vue'
import CommentUpdateModal from '@/components/Modals/CommentUpdateModal.vue'
import CommentUpdateSucceed from '@/components/Modals/CommentUpdateSucceed.vue'
/*eslint-disable */
export default {
  components: { Comment, CommentForm, CommentModal, CommentDeleteModal, CommentUpdateModal, CommentUpdateSucceed },
  data() {
    return {
      post: {
        img: {
          url: 'https://dummyimage.com/640x360/fff/fff' // дефолтный путь для отрисовки(до того, как axios сработает)
        }
      },
      comments: [],
      loading: false,
      noCommentsYet: false
    };
  },
  computed: {
    postId () {
      return Number(this.$route.params.id)
    }
  },
  methods: {
    renderPostPublic () {
      this.$axios.get('http://localhost:1337/posts').then((response) => {
          // success callback
          // console.log(response.data);
          this.$store.dispatch('SET_NAME', response.data)
          // console.log(this.$store.getters.posts)
          this.post = this.$store.getters.getPostByID(this.postId);
          // console.log(this.post);
          // console.log(this.post);
          
          this.comments = this.post.comments
          // console.log(this.comments);
          // console.log(this.comments.length);

          if (this.comments.length === 0) { // проверка на наличие комментариев
            this.noCommentsYet = true
          }else{
            this.noCommentsYet = false
          }
          this.loading = false;
      }, (response) => {
          // error callback
          // console.error(response);
          this.loading = false;
      });
    },
    renderPostLogged () {
      this.$axios({ url: 'http://localhost:1337/posts', headers: { Authorization: `Bearer ${this.$store.getters.token}`, }, method: 'GET' })
      .then( response => {
          this.$store.dispatch('SET_NAME', response.data)
          this.post = this.$store.getters.getPostByID(this.postId);
          this.comments = this.post.comments
      
          if (this.comments.length === 0) { // проверка на наличие комментариев
            this.noCommentsYet = true
          }else{
            this.noCommentsYet = false
          }
          this.loading = false;
      }, (response) => {
          this.loading = false;
      });
    },
    updateComment (comment) {
      // this.comments.push(comment);
      this.renderPostLogged()
    }
  },
  created () {
    this.loading = true;
    if (this.$store.getters.isLoggedIn === true) {
      this.renderPostLogged();
    } else {
      this.renderPostPublic();
    }
  }
};
</script>>

<style lang="scss">
.card-img-top {
    height: 30vh;
    object-fit: cover;
}

body {
    background-color: #DDD;
    font-family: 'Raleway', sans-serif;
    background: #ffffff;
    background: -moz-radial-gradient(center, ellipse cover,  #ffffff 0%, #ededed 100%);
    background: -webkit-radial-gradient(center, ellipse cover,  #ffffff 0%,#ededed 100%);
    background: radial-gradient(ellipse at center,  #ffffff 0%,#ededed 100%);
    background-attachment: fixed;
  }
  #app {
    width: 100%;
    margin: 0 auto;
    text-align: center;
    transition: all ease .6s;
  }

.comment-notlogged {
  margin-top: 35px;
  color: #47b784;
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
}
.brand h3{
    color: #47b784;
    font-size: 2em;
  }
  .brand h3 span {
    color: #36495d
  }
  .btn-primary {
    box-shadow: 2px 2px 2px #d2d2d2;
    background-color: #6f8aa7;
    padding: .5em 2em;
    display: inline-block;
    color: #FFF;
    text-decoration: none;
    border-radius: 3px;
    transition: all ease 0.3s;
  }
  .btn-primary:hover {
    background-color: #47b784
  }
  .comment-list {
    padding: 1em 0;
  }
  .comment-list ul{
    margin: 0;
    padding: 1em;
  }
  .comment-list li{
    list-style: none;
    text-align: left;
    overflow: hidden;
    margin-bottom: 2em;
    padding: .4em;
  }
  .comment-list .profile {
    width: 80px;
    float: left;
  }
  .comment-list .profile img {
    border-radius: 50%;
    border: 2px solid #FFF;
    width: 48px;
    height: 48px;
    background-color: #DDD;
    box-shadow: 0 0 5px #DDD;
  }
  .comment-list .msg {
    width: 93%;
    float: left;
    background-color: #FFF;
    border-radius: 0 5px 5px 5px;
    box-shadow: 0 4px 8px -2px rgba(0,0,0, 0.05);
    position: relative;
  }
  .comment-list .msg-body {
    padding: .8em;
    color: #666;
    line-height: 1.5
  }
  .comment-list .msg-body p:last-child {
    margin-bottom: 0;
  }
  .comment-list .msg-body:after {
    content: ' ';
    position: absolute;
    left: -13px;
    top: 0;
    border: 14px solid;
    border-color: #fff transparent transparent transparent;
  }
  .comment-list .name {
    margin: 0;
    color: #999;
    font-weight: bold;
    font-size: .8em;
  }
  .comment-list .date {
    float: right;
  }
  @media(max-width: 1200px){
      #app{
           width: 100%;
      }
      .comment-list .msg {
        width: 80%;
      }
  }
  @media(max-width: 600px){
      #app{
           width: 100%;
           margin: 2rem auto;
      }
      .brand img {
        width: 80px;
      }
      .brand h3 {
        font-size: 1.6em;
      }
      .comment-list .msg {
        width: 70%;
      }
  }
  .spinner {
    width: 20px;
    height: 20px;
    background-color: #47b784;
    display: inline-block;
    -webkit-animation: sk-rotateplane 1.2s infinite ease-in-out;
    animation: sk-rotateplane 1.2s infinite ease-in-out;
  }
  #comment .spinner {
  margin-top: 5em;
  z-index: 999;
}
#comment .loader {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 2;
}
  @-webkit-keyframes sk-rotateplane {
    0% { -webkit-transform: perspective(120px) }
    50% { -webkit-transform: perspective(120px) rotateY(180deg) }
    100% { -webkit-transform: perspective(120px) rotateY(180deg)  rotateX(180deg) }
  }
  @keyframes sk-rotateplane {
    0% { 
      transform: perspective(120px) rotateX(0deg) rotateY(0deg);
      -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg);
      background-color: #47b784;
    } 50% { 
      transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
      -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
      background-color: #36495d;
    } 100% { 
      transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
      -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
      background-color: #47b784;
    }
  }
</style>
