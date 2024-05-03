<script setup lang="ts">
import { Icon } from '@iconify/vue';

withDefaults(defineProps<{
  icon?: string,
  user: any,
}>(), {
  icon: 'tabler:a-b'
});
</script>
<template>
  <div class="flex flex-row items-center space-x-2">
    <h1 class="text-2xl font-semibold leading-none">
      Todo App
    </h1>
    <Icon :icon="icon" class="text-md" />
    <img class="inline-block size-8 rounded-full" :src="user.avatar" alt="Image Description">
  </div>
</template>
