import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default new Vuex.Store({
  state: {
    posts: [],
    status: '',
    token: localStorage.getItem('token') || '',
    user: {}
  },
  mutations: {
    // SET_NAME: (state, posts) => {
    //   state.posts = posts
    // }
    SET_POSTS: (state, payload) => {
      state.posts = payload
    },
    auth_request (state) {
      state.status = 'loading'
    },
    auth_success: (state:any, payload) => {
      state.status = 'success'
      state.token = payload[0]
      state.user = payload[1]
      console.log(state.status)
    },
    auth_error (state) {
      state.status = 'error'
      console.log(state.status)
    },
    logout (state) {
      state.status = ''
      state.token = ''
    }
    // updatePosts (state, posts) {
    //   state.posts = posts
    // }
  },
  actions: {
    SET_NAME: async (state, posts) => {
      state.commit('SET_POSTS', posts)
    },
    login ({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({ url: 'http://localhost:1337/auth/local', data: user, method: 'POST' })
          .then(resp => {
            const token = resp.data.jwt
            const user = resp.data.user
            localStorage.setItem('token', token)
            axios.defaults.headers.common['Authorization'] = token
            commit('auth_success', [token, user])
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    register ({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({ url: 'http://localhost:1337/auth/local/register', data: user, method: 'POST' })
          .then(resp => {
            const token = resp.data.jwt
            const user = resp.data.user
            localStorage.setItem('token', token)
            axios.defaults.headers.common['Authorization'] = token
            commit('auth_success', [token, user])
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error', err)
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    logout ({ commit }) {
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
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
    getPostByID: state => (id:any) => state.posts.find((post:any) => post.id === id),
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    token: state => state.token,
    status: state => state.status
  }
})
