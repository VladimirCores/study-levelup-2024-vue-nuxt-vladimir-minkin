<script setup lang="ts">
const router = useRouter();
const route = router.currentRoute;
</script>
<template>
  <div class="container mx-auto flex flex-col">
    <div class="route-name">
      {{ route.name }}
    </div>
    <slot/>
  </div>
</template>
<style>
.route-name {
  font-family: Roboto, sans-serif;
}
</style>
