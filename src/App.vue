<script setup lang="ts">
import TodoHeader from '~/components/TodoHeader.vue';
import { ref } from 'vue';
const user = ref<Record<string, any>>({ avatar: `https://i.pravatar.cc/150?img=${Math.ceil(Math.random() * 5)}` });
</script>
<template>
  <div class="app flex flex-col space-y-2 items-start justify-start mt-2">
    <TodoHeader :user="user" />
    <RouterView />
  </div>
</template>
<style>
.app {
  @apply container;
  @apply leading-none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
