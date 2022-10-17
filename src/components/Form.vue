<script setup>
  import InputCadastro from './InputCadastro.vue';
</script>

<template>
  <div class="container-centro">
    <div class="form-group">
      <InputCadastro name="Name"/>
      <InputCadastro name="Email"/>
      <InputCadastro name="Senha"/>
      <button class="btn btn-primary btn-cadastrar">Cadastrar</button>
    </div>
  </div>
</template>S

<style scoped>
.form-group {
  margin-top: 20px;;
}

.container-centro {
  margin-left: auto;
  margin-right: auto;
  padding-left: 0.4rem;
  padding-right: 0.4rem;
  width: 35%;
}

.btn-cadastrar{
  margin-top: 20px;
  background-color: #53389f;
  border-style: none;
}
</style>
