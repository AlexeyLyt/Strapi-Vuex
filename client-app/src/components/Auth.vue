<template>
<div>
<modal name="login" transition="pop-out" :width="modalWidth" :height="400">
  <div class="box">
    <div class="box-part" id="bp-left">
      <div class="partition" id="partition-register">
        <div class="loader" v-show="loading">
          <span class="spinner"></span>
        </div>
        <div class="partition-title">CREATE ACCOUNT</div>
        <div class="partition-form">
          <form autocomplete="false">

            <div class="autocomplete-fix">
              <input type="password">
            </div>

            <input v-model="formData.name" id="n-username" type="text" placeholder="Username">
            <input v-model="formData.password" id="n-password2" type="password" placeholder="Password">
            <p class="small-p" v-if="this.$store.getters.status === 'error'">Логин или пароль введен неверно<br>Повторите попытку</p>
            <p class="small-p" v-else-if="this.$store.getters.status === 'succes'"></p>
          </form>

          <div style="margin-top: 15px">
          </div>

          <div class="button-set">
            <button id="goto-signin-btn" type="submit" @click="this.login">Sign In</button>
            <button id="register-btn" type="submit" @click="this.register">Register</button>
          </div>

        </div>
      </div>
    </div>
  </div>
  <RegistrationModal/>
</modal>
</div>
</template>
<script>
import RegistrationModal from '@/components/Modals/RegistrationModal.vue'
const MODAL_WIDTH = 656
const initFromData = { name: '', password: '', email: '' }
export default {
  name: 'Auth',
  components: { RegistrationModal },
  data () {
    return {
      modalWidth: MODAL_WIDTH,
      formData: Object.assign({}, initFromData),
      name: '',
      password: '',
      is_admin: null,
      authenticate: true,
      loading: false
    }
  },
  props: {
    authenticated: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    login () {
      let identifier = this.formData.name
      let password = this.formData.password
      this.loading = true
      this.$store.dispatch('login', { identifier, password })
        .then(() => {
          // this.$router.push('/auth')
          this.$modal.hide('login')
          this.loading = false
          this.formData.name = ''
          this.formData.password = ''
        })
        // .then(() => this.$modal.hide('login'), (d) => console.log(d), this.formData.name = '', this.formData.password = '')
        .catch(err => {
          console.log(err)
          this.loading = false
          this.formData.name = ''
          this.formData.password = ''
        })
    },
    register () {
      let data = {
        username: this.formData.name,
        email: this.formData.name + '@gmail.com',
        password: this.formData.password
      }
      this.loading = true
      this.$store.dispatch('register', data)
        .then(() => {
          // this.$router.push('/auth')
          this.$modal.show('example-adaptive')
          this.loading = false
          this.formData.name = ''
          this.formData.password = ''
        }, () => {
          console.log(d)
          this.formData.name = ''
          this.formData.password = ''
          this.loading = false
        })
        // .then(() => this.$modal.show('example-adaptive'), (d) => console.log(d), this.formData.name = '', this.formData.password = '')
        .catch(err => console.log(err))
    },
    resetForm () {
      this.formData.name = ''
    }
  },
  created () {
    this.modalWidth = window.innerWidth < MODAL_WIDTH
      ? MODAL_WIDTH / 2
      : MODAL_WIDTH
    // console.log(this.formData)
    // console.log(this.authenticate)
  }
}
</script>
<style lang="scss">
// preloader
  #partition-register .spinner {
    width: 20px;
    height: 20px;
    background-color: #47b784;
    display: inline-block;
    -webkit-animation: sk-rotateplane 1.2s infinite ease-in-out;
    animation: sk-rotateplane 1.2s infinite ease-in-out;
  }
  #partition-register .spinner {
  margin-top: 5em;
  z-index: 999;
}
#partition-register .loader {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
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

.small-p {
  font-size: 10px;
  color: red;
  padding-left: 2px;
  font-weight: 700;
  margin-bottom: 0;
}

$background_color: #404142;
$github_color: #DBA226;
$facebook_color: #3880FF;
.v--modal-box {
    left: 0px !important;
    margin: auto !important;
    width: 328px !important;
    height: 100% !important;
}
.box {
  background: white;
  overflow: hidden;
  width: 328px;
  height: 100%;
  border-radius: 2px;
  box-sizing: border-box;
  box-shadow: 0 0 40px black;
  color: #8b8c8d;
  font-size: 0;
  .box-part {
    display: inline-block;
    position: relative;
    vertical-align: top;
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    &#bp-right {
      background: url("/static/panorama.jpg") no-repeat top left;
      border-left: 1px solid #eee;
    }
  }
  .box-messages {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
  }
  .box-error-message {
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    height: 0;
    line-height: 32px;
    padding: 0 12px;
    text-align: center;
    width: 100%;
    font-size: 11px;
    color: white;
    background: #F38181;
  }
  .partition {
    width: 100%;
    height: 100%;
    .partition-title {
      box-sizing: border-box;
      padding: 30px;
      width: 100%;
      text-align: center;
      letter-spacing: 1px;
      font-size: 20px;
      font-weight: 300;
    }
    .partition-form {
      padding: 0 20px;
      padding-bottom: 25px;
      box-sizing: border-box;
    }
  }
  input[type=password],
  input[type=text] {
    display: block;
    box-sizing: border-box;
    margin-bottom: 4px;
    width: 100%;
    font-size: 12px;
    line-height: 2;
    border: 0;
    border-bottom: 1px solid #DDDEDF;
    padding: 4px 8px;
    font-family: inherit;
    transition: 0.5s all;
    outline: none;
  }
  button {
    background: white;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 10px;
    letter-spacing: 1px;
    font-family: "Open Sans", sans-serif;
    font-weight: 400;
    min-width: 140px;
    margin-top: 8px;
    color: #8b8c8d;
    cursor: pointer;
    border: 1px solid #DDDEDF;
    text-transform: uppercase;
    transition: 0.1s all;
    font-size: 10px;
    outline: none;
    &:hover {
      border-color: mix(#DDDEDF, black, 90%);
      color: mix(#8b8c8d, black, 80%);
    }
  }
  .large-btn {
    width: 100%;
    background: white;
    span {
      font-weight: 600;
    }
    &:hover {
      color: white !important;
    }
  }
  .button-set {
    margin-bottom: 8px;
  }
  #register-btn,
  #signin-btn {
    margin-left: 8px;
  }
  .facebook-btn {
    border-color: $facebook_color;
    color: $facebook_color;
    &:hover {
      border-color: $facebook_color;
      background: $facebook_color;
    }
  }
  .github-btn {
    border-color: $github_color;
    color: $github_color;
    &:hover {
      border-color: $github_color;
      background: $github_color;
    }
  }
  .autocomplete-fix {
    position: absolute;
    visibility: hidden;
    overflow: hidden;
    opacity: 0;
    width: 0;
    height: 0;
    left: 0;
    top: 0;
  }
}
.pop-out-enter-active,
.pop-out-leave-active {
  transition: all 0.5s;
}
.pop-out-enter,
.pop-out-leave-active {
  opacity: 0;
  transform: translateY(24px);
}
</style>
