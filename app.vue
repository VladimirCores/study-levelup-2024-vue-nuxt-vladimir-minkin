<script setup lang="ts">
const products = useProducts();
const card = useCard();
const uid = useCookie<number>('uid');

uid.value = 123;

const { data, pending } = products.retrieve(10, true);

watch(data, (value) => {
  console.log('> App -> watch: data =', value);
  products.setup(value);
  card.restore(products.list.value);
});
console.log('> app -> setup: refresh')
</script>
<template>
  <Spinner v-if="pending"/>
  <NuxtLayout v-else>
    <NuxtPage />
  </NuxtLayout>
</template>
