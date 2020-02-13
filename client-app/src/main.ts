import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BootstrapVue, IconsPlugin, BNavbar, BootstrapVueIcons, ButtonPlugin, BFormInput } from 'bootstrap-vue'
import VModal from 'vue-js-modal' // https://www.npmjs.com/package/vue-js-modal
import moment from 'moment'
// import Datepicker from 'vuejs-datepicker'

Vue.component('b-form-input', BFormInput)
Vue.use(VModal)
Vue.use(BootstrapVueIcons)
Vue.use(BootstrapVue, BNavbar, IconsPlugin, ButtonPlugin)

Vue.prototype.moment = moment
moment.locale('ru')

Vue.prototype.$axios = axios

const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$axios.defaults.headers.common['Authorization'] = token
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
