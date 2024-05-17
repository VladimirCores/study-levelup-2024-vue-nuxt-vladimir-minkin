<script setup lang="ts">
defineProps<{
  title: string,
  to: string
}>();
</script>
<template>
  <RouterLink :to="to">
    <button
      class="
          border
          p-1
          rounded
          hover:cursor-pointer
          bg-gray-100
        "
    >
      {{ title }}
    </button>
  </RouterLink>
</template>
