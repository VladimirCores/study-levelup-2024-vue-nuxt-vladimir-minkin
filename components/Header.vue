<script setup lang="ts">
defineProps<{ title: string }>();
</script>
<template>
<div class="flex flex-row justify-between">
  <span class="text-xl font-bold">{{ title }}</span>
  <slot name="right"/>
</div>
</template>
