<template>
    <div class="block-posts">
    <div class="card-link">
      <article class="blog-card">
        <div class="post-image">
          <label>File
            <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
          </label>
          <!-- <div class="preload-img">Selected file: {{ file ? file.name : '' }}</div>
          <b-form-file
            class="upload-img"
            ref="file"
            v-on:change="handleFileUpload()"
            placeholder="Choose a file or drop it here..."
            drop-placeholder="Drop file here..."
          ></b-form-file> -->
        </div>
        <div class="article-details">
          <label for="category" class="post-category">Категории поста</label>
          <b-form-input id="category" :state="null" placeholder="Set category"></b-form-input>

          <label for="title" class="post-title">Заглавие поста</label>
          <b-form-input id="title" :state="null" placeholder="Set post title"></b-form-input>

          <p class="post-date"><b-icon icon="calendar-fill"></b-icon> Дата поста </p>
          <date-picker v-model="time1" valueType="format" :format="momentForamt"></date-picker>
          <p class="post-description"> Описание поста </p>
          <b-form-textarea
            id="textarea"
            placeholder="Enter something..."
            rows="3"
            max-rows="6"
          ></b-form-textarea>

          <label for="author" class="post-author"> <b-icon icon="award"></b-icon>Заглавие поста </label>
          <b-form-input id="author" class="post-author-input" :state="null" placeholder="Set post author"></b-form-input>

          <b-button v-on:click="submitFile()" class="post-btn">Создать пост</b-button>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
// import Datepicker from 'vuejs-datepicker'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import moment from 'moment'
export default {
  name: 'Modal_Adaptive',
  components: {
    DatePicker
  },
  data () {
    return {
      time1: null,
      file: null,
      momentForamt: {
        // Date to String
        stringify: (date) => {
          return date ? moment(date).format('MM/DD/YYYY') : ''
        },
        // String to Date
        parse: (value) => {
          return value ? moment(value, 'MM/DD/YYYY').toDate() : null
        }
      }
    }
  },
  methods: {
    handleFileUpload () {
      this.file = this.$refs.file.files[0]
      console.log(this.file)
    },
    submitFile () {
      let formData = new FormData()
      formData.append('file', this.file)
      let el = formData.getAll('file')
      console.log(el)
      this.$axios(
        {
          url: 'http://localhost:1337/upload',
          el,
          headers: {
            Authorization: `Bearer ${this.$store.getters.token}`,
            'Content-Type': 'multipart/form-data'
          },
          method: 'POST'
        }
      )
        .then(() => {
          console.log('SUCCESS!!')
        })
        .catch(() => {
          console.log('FAILURE!!')
        })
    }
  },
  created () {
  }
}
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto:400,700");
* {
  box-sizing: border-box;
}
*::before,
*::after {
  box-sizing: border-box;
}

body {
  display: flex;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  color: #777;
  background: #eedfcc;
  font-size: 0.9375rem;
  min-height: 100vh;
  margin: 0;
  line-height: 1.6;
  align-items: center;
  justify-content: center;
  text-rendering: optimizeLegibility;
}

#container {
  width: 30rem;
  height: 13.625rem;
}

.blog-card {
  display: flex;
  flex-direction: row;
  background: #fff;
  box-shadow: 0 0.1875rem 1.5rem rgba(0, 0, 0, 0.2);
  border-radius: 0.375rem;
  overflow: hidden;
}

.post-btn {
  margin-right: 10px;
  background-color: #50c8b9;
  border-color: transparent;
}

.card-link {
  position: relative;
  display: block;
  color: inherit;
  text-decoration: none;
  margin-left: 0 !important;
  margin-bottom: 15px;
  cursor: pointer;
}
.card-link:hover .post-title {
  transition: color 0.3s ease;
  color: #e04f62;
}
.card-link:hover .post-image {
  transition: opacity 0.3s ease;
  opacity: 0.9;
}

.post-image {
  transition: opacity 0.3s ease;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  object-fit: cover;
  border-right: 1px solid black
}

.preload-img {
  width: 100%;
  height: 90%;
}

.upload-img {
  width: 100%;
  height: 10%;
}

.article-details {
  padding: 1.5rem;
}

.post-category {
  font-family: 'Bangers', cursive;
  display: inline-block;
  text-transform: uppercase;
  font-size: 15px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.0625rem;
  margin: 0 0 0.75rem 0;
  margin-right: 10px;
  padding: 0 0 0.25rem 0;
  border-bottom: 0.125rem solid #ebebeb;
}

.post-description {
  font-family: 'Titillium Web', sans-serif;
  margin-top: 15px;
}

.post-title {
  transition: color 0.3s ease;
  font-size: 25px;
  line-height: 1.4;
  color: #121212;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  // font-family: 'Bangers', cursive;
  font-family: 'Titillium Web', sans-serif;
}

.post-author {
  font-family: 'Titillium Web', sans-serif;
  font-size: 15px;
  font-weight: 700;
  line-height: 1;
  // margin: 1.125rem 0 0 0;
  margin-bottom: 10px;
  padding: 1.125rem 0 0 0;
  // border-top: 0.0625rem solid #ebebeb;
}

.post-author-input {
  margin-bottom: 15px;
}

.post-date {
  font-family: 'Titillium Web', sans-serif;
  font-size: 15px;
  font-weight: 700;
  line-height: 1;
  margin-top: 15px;
  // margin: 1.125rem 0 0 0;
  // padding: 1.125rem 0 0 0;
  // border-top: 0.0625rem solid #ebebeb;
}

@media (max-width: 40rem) {
  #container {
    width: 18rem;
    height: 27.25rem;
  }

  .blog-card {
    flex-wrap: wrap;
  }
}
@supports (display: grid) {
  body {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 0.625rem;
    grid-template-areas: ". main main ." ". main main .";
  }

  #container {
    grid-area: main;
    align-self: center;
    justify-self: center;
  }

  .post-image {
    height: 100%;
  }

  .blog-card {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 1fr;
  }

  @media (max-width: 40rem) {
    .blog-card {
      grid-template-columns: auto;
      grid-template-rows: 12rem 1fr;
    }
  }
}
</style>
