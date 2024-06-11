<script setup lang="ts">
const { list } = useProducts();
</script>
<template>
  <div class="
    grid grid-cols-3 gap-2
    place-items-start
    place-content-start
  ">
    <div v-for="product in list" :key="product.id" class="h-full w-full">
      <div class="card w-72 bg-base-100 shadow-xl image-full h-full w-full">
        <figure><img :src="product.thumbnail" alt="Shoes" /></figure>
        <div class="card-body h-full">
          <h2 class="card-title">{{ product.title }}</h2>
          <p>{{ product.description }}</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
