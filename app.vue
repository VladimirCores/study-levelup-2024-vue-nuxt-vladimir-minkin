<script setup lang="ts">
import DataKeys from "~/constants/DataKeys";

const { data, pending, refresh } = await useFetch('https://dummyjson.com/products?limit=10', {
  immediate: false,
  key: DataKeys.PRODUCTS
});
onMounted(() => {
  refresh();
})
</script>
<template>
  <Spinner v-if="pending"/>
  <NuxtLayout v-else>
    <NuxtPage />
  </NuxtLayout>
</template>
