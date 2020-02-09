<template>
    <modal
      name="comment-update-succeed"
      transition="nice-modal-fade"
      :min-width="200"
      :min-height="200"
      :delay="100"
      :adaptive="true">
    <div class="example-modal-content">
        Ваш комментарий успешно изменен
    </div>
    <button class="modal-close" @click="this.close">Закрыть</button>
  </modal>
</template>
<script>
export default {
  name: 'Modal_Adaptive',
  methods: {
    close () {
      this.$modal.hide('comment-update-succeed')
      this.$modal.hide('comment-update-modal')
    }
  }
}
</script>

<style scoped lang="scss">
.example-modal-content {
    padding: 15px;
    text-align: center;
}
.modal-close {
    display: inline-block;
    width: 100%;
    border: none;
    background-color: white;
    color: #5a6876;
    font-weight: bold;
    border-top: 2px solid #0000001f;
    padding: 5px;
}
</style>
