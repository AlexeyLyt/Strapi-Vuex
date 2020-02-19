import Vue from 'vue'
import VueRouter from 'vue-router'
import Public from '../views/Public.vue'
import postCard from '../views/PostCard.vue'
import Auth from '../views/Auth.vue'

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
    path: '/auth',
    name: 'auth',
    component: Public
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
