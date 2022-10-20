<template>
  <div class="container">
    <h1>{{ count }}</h1>
    <button @click="count++">Count</button>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      count: 0,
    };
  },
};
</script>

<style>
.container {
  text-align: center;
  font-family: sans-serif;
}
</style>
