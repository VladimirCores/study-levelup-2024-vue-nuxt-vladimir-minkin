<script setup lang="ts">
import Strings from '~/constants/Strings.ts';
import ButtonPrimary from '~/components/buttons/ButtonPrimary.vue';

defineProps<{ locked: boolean }>();
const emits = defineEmits<{ create: [] }>();
const input = defineModel<string>('text');

const onButtonCreateAction = () => {
  console.log('> TodoInput -> onButtonCreateAction');
  emits('create');
};
</script>
<template>
  <div class="flex flex-row space-x-2 items-center">
    <input
      v-model="input"
      :disabled="locked"
      type="text"
      class="
        py-3 px-4
        block w-full
        border-gray-200
        rounded-lg
        text-sm
        focus:border-blue-500 focus:ring-blue-500
        disabled:opacity-50 disabled:pointer-events-none
      "
      @keyup.enter="onButtonCreateAction"
    >
    <ButtonPrimary :disabled="locked" :title="Strings.TODO_BTN__CREATE" @action="onButtonCreateAction" />
  </div>
</template>
