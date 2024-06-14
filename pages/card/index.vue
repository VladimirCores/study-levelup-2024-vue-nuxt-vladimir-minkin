<script setup lang="ts">
const router = useRouter();
const route = router.currentRoute;
const onBackLinkClick = () => {
  console.log('> Cart -> onBackLinkClick');
  router.back();
}
</script>
<template>
  <div>{{ route.name }}</div>
</template>
