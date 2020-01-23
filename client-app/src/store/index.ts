import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default new Vuex.Store({
  state: {
    posts: []
  },
  mutations: {
    // SET_NAME: (state, posts) => {
    //   state.posts = posts
    // }
    SET_POSTS: (state, payload) => {
      state.posts = payload
    }
    // updatePosts (state, posts) {
    //   state.posts = posts
    // }
  },
  actions: {
    SET_NAME: async (state, posts) => {
      state.commit('SET_POSTS', posts)
    }
    // loadData ({
    //   commit
    // }) {
    //   axios.get(`http://localhost:1337/posts`)
    //     .then((response:any) => {
    //       commit('updatePosts', response.data)
    //     })
    // }
  },
  modules: {
  },
  getters: {
    posts: state => state.posts,
    getPostByID: state => (id:any) => state.posts.find((post:any) => post.id === id)
  }
})
