<script setup lang="ts">
import { ref } from "vue";
const count = ref(0);

const handleOnClick = (url: string) => {
  window.myAPI.openExternal(url);
};
</script>

<template>
  <div>
    <div>
      <img
        @click="handleOnClick('https://electronjs.org/')"
        src="./assets/electron.svg"
        class="logo"
        alt="Electron logo"
      />
    </div>
    <div class="card">
      <button @click="count++">count is {{ count }}</button>
      <p>Edit <code>src/web/App.vue</code> to test HMR</p>
    </div>
    <p class="read-the-docs">Click on the Electron logo to learn more</p>
  </div>
</template>

<style scoped>
button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}

code {
  color: #646cff;
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}

.card {
  padding: 2em;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
  cursor: pointer;
}

.read-the-docs {
  color: #888;
}

@media (prefers-color-scheme: light) {
  button {
    background-color: #f9f9f9;
  }
}
</style>
