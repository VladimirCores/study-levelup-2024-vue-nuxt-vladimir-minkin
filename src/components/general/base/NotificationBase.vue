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
  </div>
</template>
