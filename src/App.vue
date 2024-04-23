<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue';
import LinkedImage from './components/LinkedImage.vue';
import imgVueLogo from './assets/vue.svg';
</script>
<template>
  <div>
    <LinkedImage
      link="https://vitejs.dev"
      image="/vite.svg"
      alt="Vite logo"
      filter="#646cffaa"
    />
    <LinkedImage
      link="https://vuejs.org/"
      :image="imgVueLogo"
      alt="Vue logo"
      filter="#42b883aa"
    />
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>
