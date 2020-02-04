<template>
    <modal
      name="example-adaptive"
      transition="nice-modal-fade"
      :min-width="200"
      :min-height="200"
      :delay="100"
      :adaptive="true">
    <div class="example-modal-content">
      Registrarion succes
    </div>
    <button class="modal-close" @click="this.close">Close</button>
  </modal>
</template>
<script>
export default {
  name: 'Modal_Adaptive',
  methods: {
    close () {
      this.$modal.hide('example-adaptive')
      this.$modal.hide('login')
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
