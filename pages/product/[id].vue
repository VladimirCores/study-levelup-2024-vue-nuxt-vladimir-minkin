<script setup lang="ts">
const route = useRoute();
const products = useProducts();
const id = route.params.id || '-' ;
onMounted(() => {
  console.log('> ProductPage -> onMounted: id =', id);
})
</script>
<template>
  PID: {{ id }}
</template>
