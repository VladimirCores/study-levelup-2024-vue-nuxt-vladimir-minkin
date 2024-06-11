<script setup lang="ts">

const products = useProducts();
const uid = useCookie<number>('uid');

uid.value = 123;
const { pending } = products.retrieve(10, true);
console.log('> app -> setup: refresh')
</script>
<template>
  <Spinner v-if="pending"/>
  <NuxtLayout v-else>
    <NuxtPage />
  </NuxtLayout>
</template>
