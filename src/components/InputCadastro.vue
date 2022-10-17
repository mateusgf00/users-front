<template>
  <label class="form-label" for="input-example-1">{{name}}</label>
      <input
        class="form-input"
        type="text"
        id="input-example-1"
        placeholder=
      />
</template>

<script setup>
const props = defineProps({
  name: String
})
</script>