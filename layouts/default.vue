<script setup lang="ts">
import Routes from "~/constants/Routes";

const app = useAppConfig();
const router = useRouter();
const route = router.currentRoute;
const products = useProducts();
const card = useCard();

const canRenderButtonNavigationBack = computed(() => route.value.path !== '/');

</script>
<template>
  <div class="container mx-auto flex flex-col space-y-2">
    <Header :title="app.name">
      <template #right>
        <span class="text-base">
          <NuxtLink :to="Routes.CARD">Card Items</NuxtLink>: {{ card.amount }}
        </span>
      </template>
    </Header>
    <div class="flex flex-row justify-between">
      <div class="flex flex-row justify-start items-center space-x-2">
        <ButtonsNavigateBack v-if="canRenderButtonNavigationBack" />
        <span class="route-name">
          {{ route.name }}
        </span>
      </div>
      <div>Total number of products: {{ products.total }}</div>
    </div>
    <slot/>
  </div>
</template>
<style>
.route-name {
  font-family: Roboto, sans-serif;
}
</style>
