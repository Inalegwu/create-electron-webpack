<script setup>
import { ref } from "vue";
const count = ref(0);
</script>

<template>
  <div class="container">
    <h1>{{ count }}</h1>
    <button @click="count++">Count</button>
  </div>
</template>

<style scoped>
.container {
  text-align: center;
  font-family: sans-serif;
}
</style>
