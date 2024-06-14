<script setup lang="ts">
import Routes from "~/constants/Routes";
</script>
<template>
  <div class="flex flex-row space-x-2">
    <NuxtLink :to="Routes.CARD">Cart</NuxtLink>
    <NuxtLink :to="Routes.PRODUCTS">Products</NuxtLink>
  </div>
</template>
