<template>
    <div class="block-posts">
    <div class="card-link">
      <article class="blog-card">
        <img class="post-image" :src="'http://localhost:1337'+post.img.url" />
        <div class="article-details">
          <h4 class="post-category"> Категории поста </h4>
          <h3 class="post-title"> Заглавие поста </h3>
          <p class="post-date"><b-icon icon="calendar-fill"></b-icon> Дата поста </p>
          <p class="post-description"> Описание поста </p>
          <b-button :to="{ name: 'post', params: { id: post.id } }" class="post-btn">Read More</b-button>
          <b-button class="post-btn">Comments</b-button>
          <p class="post-author"><b-icon icon="award"></b-icon> By {{ post.author }}</p>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal_Adaptive',
  methods: {
<<<<<<< HEAD
    handleFileUpload () {
      this.file = this.$refs.file.files[0]
      console.log(this.file)
    },
    submitFile () {
      let form = this.$refs['uploadForm']
      let formElements = form.elements
      let fileApi = {}
      let dataD = {
        'img': {
          'id': 0
        }
      }
      formElements.forEach(currentElement => {
        if (!['submit', 'file'].includes(currentElement.type)) {
          dataD[currentElement.name] = currentElement.value
        } else if (currentElement.type === 'file') {
          let formData = new FormData()
          formData.append('files', this.file)
          // console.log(formData.getAll('file'))
          this.$store.dispatch('sendFileToStrapi', formData)
            .then(response => {
              console.log(response.data)
              this.$store.dispatch('SET_FILE_ID_API', response.data[0].id)
              console.log(this.$store.getters.fileId)
              dataD.img.id = 2
              // this.$axios({
              //   url: `http://localhost:1337/upload/files/${response.data[0].id}`,
              //   headers: {
              //     Authorization: `Bearer ${this.$store.getters.token}`
              //   },
              //   methods: 'GET'
              // }).then(res => {
              //   console.log(res)
              // })
              this.$axios({
                url: 'http://localhost:1337/tests',
                data: dataD,
                headers: {
                  Authorization: `Bearer ${this.$store.getters.token}`,
                  'Content-Type': 'multipart/form-data'
                },
                methods: 'POST'
              }).then(res => {
                console.log(res)
              })
            },
            response => {
              // error callback
              this.loading = false
            })
          // this.$axios({
          //   url: 'http://localhost:1337/upload',
          //   data: formData,
          //   headers: {
          //     Authorization: `Bearer ${this.$store.getters.token}`,
          //     'Content-Type': 'multipart/form-data'
          //   },
          //   method: 'POST'
          // }).then((res) => {
          //   this.fileApi = res.data[0].id
          //   dataD.img.id = this.fileApi
          //   console.log(this.fileApi)
          // }).catch(() => {
          //   console.log('FAILURE!!')
          // })
        }
      })
      // console.log(dataD)
    }
  },
  created () {
=======
>>>>>>> b33150156605a24df759a8459520b50467e5f0f8
  }
}
</script>

<style scoped lang="scss">

</style>
