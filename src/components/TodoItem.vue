<script setup lang="ts">
import { Icon } from '@iconify/vue';
defineProps<{
  text: string,
  completed: boolean
  isSelected: boolean
}>();

defineEmits(['complete', 'edit', 'delete']);
</script>
<template>
  <li
    class="
      p-2
      w-full
      rounded-md
      flex flex-row items-center justify-between
      bg-blue-100/50 hover:bg-blue-100
    "
    :class="isSelected && '!bg-blue-100 border border-blue-500 box-border'"
  >
    <div class="flex flex-row space-x-3 items-center">
      <Icon
        icon="tabler:circle-dashed-check"
        class="text-base cursor-pointer"
        :class="completed ? 'text-green-500' : 'text-gray-600'"
        @click="$emit('complete')"
      />
      <span class="text-gray-600 text-sm">
        {{ text }}
      </span>
    </div>
    <div class="flex flex-row space-x-2">
      <Icon
        icon="tabler:edit"
        class="text-lg text-gray-300 hover:text-blue-500 cursor-pointer"
        :class="{ 'text-blue-500': isSelected }"
        @click.prevent.stop="$emit('edit')"
      />
      <Icon
        icon="tabler:trash"
        class="text-lg text-gray-300 hover:text-red-500 cursor-pointer"
        @click="$emit('delete')"
      />
    </div>
  </li>
</template>

