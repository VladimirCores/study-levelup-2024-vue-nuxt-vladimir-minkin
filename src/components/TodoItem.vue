<script setup lang="ts">
import { Icon } from '@iconify/vue';
defineProps<{
  text: string,
  completed: boolean
}>();
</script>
<template>
  <li
    class="
      p-2
      w-full
      rounded-md
      flex flex-row space-x-3 items-center
      bg-blue-100/50 hover:bg-blue-100
    "
  >
    <Icon
      icon="tabler:circle-dashed-check"
      class="text-sm  pointer-events-none"
      :class="completed ? 'text-green-600' : 'text-gray-600'"
    />
    <span class="text-gray-600 text-sm">
      {{ text }}
    </span>
  </li>
</template>

