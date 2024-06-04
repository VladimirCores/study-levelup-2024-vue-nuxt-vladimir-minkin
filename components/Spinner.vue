<script setup lang="ts">
withDefaults(defineProps<{
  center: boolean
}>(), {
  center: true
});
</script>
<template>
  <div :class="center && 'w-screen h-screen grid items-center justify-center'">
    <span class="loader"></span>
  </div>
</template>

<style scoped>
.loader {
  width: 48px;
  height: 48px;
  border: 5px solid #FFB3B3E2;
  border-bottom-color: #FF3D00;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
