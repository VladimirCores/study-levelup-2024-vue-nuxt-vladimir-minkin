<script setup lang="ts">
import { Icon } from '@iconify/vue';
const router = useRouter();
</script>
<template>
  <a @click.prevent="router.back()" class="link">
    <Icon icon="tabler:square-rounded-chevron-left" class="text-gray-600 hover:text-gray-800 text-xl"/>
  </a>
</template>
