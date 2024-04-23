<script lang="ts">
import { defineComponent } from 'vue';
import { decodeForUrlFormat } from '~/utils/StringUtils.ts';

export default defineComponent({
  props: {
    msg: {
      type: String,
      default: ''
    },
  },
  data: () => ({
    count: 0,
    message: '',
  }),
  created() {
    console.log('> HelloWorld -> created:', { msg: this.msg });
    this.message = this.msg;
  },
  methods: { decodeForUrlFormat }
});
</script>

<template>
  <h1>
    {{ msg ? decodeForUrlFormat(msg) : 'no message' }}
  </h1>
  <input v-model="message">
  <div>
    {{ message }}
  </div>

  <div class="card">
    <button type="button" @click="count++">
      counter is {{ count }}
    </button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a
      href="https://vuejs.org/guide/quick-start.html#local"
      target="_blank"
    >create-vue</a>, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p style="color: #888;">
    Click on the Vite and Vue logos to learn more
  </p>
</template>
