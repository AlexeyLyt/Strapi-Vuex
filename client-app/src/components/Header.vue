<template>
  <div class="header">
       <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand to="/">News</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>

      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit"><b-icon icon="search"></b-icon>Search</b-button>
        </b-nav-form>

        <button v-if="isLoggedIn" class="btn green" @click="logout">
          <b-icon icon="x-octagon-fill"></b-icon>
          Logout
        </button>

        <button
          v-else
          class="btn green"
          @click="$modal.show('login')"
        >
          <b-icon icon="person-fill"></b-icon>
          Login
        </button>

        <Auth :authenticated="authenticated"/> <!-- Модальное окно -->

      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  </div>
</template>

<script>
/*eslint-disable */
import Auth from './Auth.vue'
export default {
  components: { Auth },
  data () {
    return {
      authenticated: false
    }
  },
  computed: {
    isLoggedIn () {
      return this.$store.getters.isLoggedIn
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout').then(() => {
        this.$router.push('/')
      })
    }
  }
}
</script>>

<style scoped lang="scss">
button.btn {
  outline: none;
  background: white;
  border: 0;
  font-size: 14px;
  cursor: pointer;
  border-radius: 3px;
  color: white;
  box-shadow: 0 4px 8px rgba(#20a0ff, .3);
  background: #4db3ff;
  font-weight: 600;
  border-radius: 3px;
  min-width: 90px;
  margin-bottom: 8px;
  margin-top: 8px;
  margin-right: 8px;
  padding: 4px 8px;
  &:hover {
    background: #20a0ff;
  }
  &.green {
    box-shadow: 0 4px 8px rgba(#50C9BA, .3);
    background: #50C9BA;
    &:hover {
     background: mix(#50C9BA, black, 95%);
    }
  }
}
</style>
