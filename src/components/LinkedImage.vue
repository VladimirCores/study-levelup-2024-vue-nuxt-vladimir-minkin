<template>
  <a :href="link" target="_blank">
    <img
      :src="image"
      style="
        height: 6em;
        padding: 1.5em;
        will-change: filter;
        transition: filter 300ms;
      "
      :alt="alt"
    >
  </a>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    link: {
      type: String,
      default: '/'
    },
    image: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: ''
    },
    filter: {
      type: String,
      default: '#ff0000'
    },
  }
});
</script>
<style>
a:hover {
  filter: drop-shadow(0 0 2em v-bind('filter'));
}
</style>
