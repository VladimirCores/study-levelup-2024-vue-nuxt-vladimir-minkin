<script setup lang="ts">
import type { IProductVO } from "~/interfaces";

const { list } = useProducts();
const card = useCard();

const getProductFromClickedButton = (btn: HTMLButtonElement): IProductVO => {
  const parent = btn.parentElement;
  const productIndex = parseInt(parent!.dataset.index as string);
  return list.value[productIndex];
}

const onProductAddClick = (event: MouseEvent, btn = event.currentTarget as HTMLButtonElement) => {
  const productVO = getProductFromClickedButton(btn);
  console.log('> Products -> onProductAddClick: productVO =', productVO);
  card.add(productVO);
}
const onProductRemoveClick = (event: MouseEvent, btn = event.currentTarget as HTMLButtonElement) => {
  const productVO = getProductFromClickedButton(btn);
  console.log('> Products -> onProductRemoveClick: productVO =', productVO);
  card.remove(productVO);
}
</script>
<template>
  <div class="
    grid grid-cols-3 gap-2
    place-items-start
    place-content-start
  ">
    <div v-for="(product, index) in list" :key="product.id" class="h-full w-full">
      <div class="card w-72 bg-base-50 shadow-xl image-full h-full w-full">
        <figure><img :src="product.thumbnail" alt="Shoes" /></figure>
        <div class="card-body h-full">
          <h2 class="card-title">{{ product.title }}</h2>
          <p>{{ product.description }}</p>
          <div class="card-actions justify-between">
            <div :key="product.amount">{{ product.amount || '' }}</div>
            <div :data-index="index" class="flex flex-row space-x-2">
              <button class="btn btn-sm btn-primary" @click="onProductAddClick">Add</button>
              <button
                :disabled="!product.amount"
                class="btn btn-sm btn-outline btn-warning"
                @click="onProductRemoveClick"
              >
                  Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
