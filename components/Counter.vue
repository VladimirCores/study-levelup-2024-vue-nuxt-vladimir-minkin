<script setup lang="ts">
const counter = ref(0);
</script>
<template>
  <div class="flex flex-row items-center justify-start space-x-2">
    <span>{{ counter }}</span>
    <button class="btn" @click="counter++">+</button>
  </div>
</template>
