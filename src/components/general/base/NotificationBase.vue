<script setup lang="ts">
import { Icon } from '@iconify/vue';
defineProps<{
  color: string,
  title: string,
  message: string
}>();
defineEmits(['close']);
</script>
<template>
  <div
    class="
        mt-2 p-4
        flex flex-row items-center justify-between
        rounded-lg
        border
      "
    :class="`bg-${color}-100 border-${color}-200`"
    role="alert"
  >
    <span class="text-sm" :class="`text-${color}-800`">
      <span class="font-bold">{{ title }}</span> {{ message }}
    </span>
    <Icon
      icon="tabler:x"
      class="text-sm cursor-pointer"
      :class="`text-${color}-600 hover:text-${color}-700`"
      @click="$emit('close')"
    />
    <div class="hidden colors" />
  </div>
</template>
<style scoped>
.colors {
  @apply bg-blue-100 border-blue-200 text-blue-600 text-blue-700 text-blue-800;
  @apply bg-red-100 border-red-200 text-red-600 text-red-700 text-red-800;
  @apply bg-green-100 border-green-200 text-green-600 text-green-700 text-green-800;
}
</style>
