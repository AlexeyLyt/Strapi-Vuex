import Vue from 'vue'
import VueRouter from 'vue-router'
import Public from '../views/Public.vue'
import postCard from '../views/PostCard.vue'
import UserList from '../views/UserList.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: { name: 'public' } },
  {
    path: '/public',
    name: 'public',
    component: Public
  },
  {
    path: '/post/:id',
    name: 'post',
    component: postCard
  },
  {
    path: '/userList',
    name: 'users',
    component: UserList
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
