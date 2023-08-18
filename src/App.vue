<script setup lang="ts">
</script>

<template>
  <div class="flex gap-3 container mx-auto">
    <ul class="flex gap-2 m-4">
      <li class="inline-block py-2 px-4">
        <router-link to="/">Home</router-link>
      </li>
      <li class="inline-block py-2 px-4">
        <router-link to="/examples">Examples</router-link>
      </li>
      <li class="inline-block py-2 px-4">
        <router-link to="/fyndster">Fyndster</router-link>
      </li>
    </ul>
  </div>
  <div class="p-2 container mx-auto">
    <router-view></router-view>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
