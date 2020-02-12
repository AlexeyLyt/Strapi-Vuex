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
    user: {},
    users: {},
    comment: '',
    commentId: '',
    token: localStorage.getItem('token') || '',
    userId: localStorage.getItem('userId') || '',
    userName: localStorage.getItem('userName') || '',
    isAdmin: localStorage.getItem('isAdmin') || ''
  },
  mutations: {
    // SET_NAME: (state, posts) => {
    //   state.posts = posts
    // }
    SET_POSTS: (state, payload) => {
      state.posts = payload
    },
    SET_USERS: (state, payload) => {
      state.users = payload
    },
    SET_TEXT: (state, payload) => {
      state.comment = payload
    },
    SET_COMMENTID: (state, payload) => {
      state.commentId = payload
    },
    auth_request (state) {
      state.status = 'loading'
    },
    auth_admin: (state:any, payload) => {
      state.isAdmin = payload
    },
    auth_success: (state:any, payload) => {
      state.status = 'success'
      state.token = payload[0]
      state.user = payload[1]
      state.userId = payload[2]
      state.userName = payload[3]
      // console.log(state.status)
    },
    auth_error (state) {
      state.status = 'error'
      console.log(state.status)
    },
    logout (state) {
      state.status = ''
      state.token = ''
      state.isAdmin = ''
    }
  },
  actions: {
    SET_NAME: async (state, posts) => {
      state.commit('SET_POSTS', posts)
    },
    SET_USER_API: async (state, users) => {
      state.commit('SET_USERS', users)
    },
    SET_COMMENT_TEXT_API: async (state, text) => {
      state.commit('SET_TEXT', text)
    },
    SET_COMMENT_ID_API: async (state, comment) => {
      state.commit('SET_COMMENTID', comment)
    },
    login ({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({ url: 'http://localhost:1337/auth/local', data: user, method: 'POST' })
          .then(resp => {
            const token = resp.data.jwt
            const user = resp.data.user
            const userId = resp.data.user.id
            const userName = resp.data.user.username
            if (resp.data.user.role.type === 'admin') {
              let admin = resp.data.user.role.type
              localStorage.setItem('isAdmin', admin)
              commit('auth_admin', admin)
            }
            console.log(resp.data)
            console.log(this.getters.isAdmin)
            localStorage.setItem('userName', userName)
            localStorage.setItem('userId', userId)
            localStorage.setItem('token', token)
            axios.defaults.headers.common['Authorization'] = token
            commit('auth_success', [token, user, userId, userName])
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('isAdmin')
            localStorage.removeItem('userName')
            localStorage.removeItem('userId')
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
            const userId = resp.data.user.id
            const userName = resp.data.user.username
            localStorage.setItem('userName', userName)
            localStorage.setItem('userId', userId)
            localStorage.setItem('token', token)
            axios.defaults.headers.common['Authorization'] = token
            commit('auth_success', [token, user, userId, userName])
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error', err)
            localStorage.removeItem('userName')
            localStorage.removeItem('userId')
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    logout ({ commit }) {
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('isAdmin')
        localStorage.removeItem('userName')
        localStorage.removeItem('userId')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    },
    comment ({ commit }, comment) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({ url: 'http://localhost:1337/comments', data: comment, headers: { Authorization: `Bearer ${this.state.token}` }, method: 'POST' })
          .then(resp => {
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    commentDelete ({ commit }, comment) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({ url: `http://localhost:1337/comments/${comment}`, headers: { Authorization: `Bearer ${this.state.token}` }, method: 'DELETE' })
          .then(resp => {
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    commentUpdate ({ commit }, comment) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({ url: `http://localhost:1337/comments/${this.state.commentId}`, headers: { Authorization: `Bearer ${this.getters.token}` }, data: comment, method: 'PUT' })
          .then(resp => {
            console.log(this.getters.comment)
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  },
  modules: {
  },
  getters: {
    posts: state => state.posts,
    getPostByID: state => (id:any) => state.posts.find((post:any) => post.id === id),
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    token: state => state.token,
    status: state => state.status,
    userId: state => state.userId,
    user: state => state.user,
    userName: state => state.userName,
    users: state => state.users,
    comment: state => state.comment,
    commentId: state => state.commentId,
    isAdmin: state => !!state.isAdmin
  }
})
