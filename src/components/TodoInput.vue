<script setup lang="ts">
import Strings from '~/constants/Strings.ts';
import ButtonPrimary from '~/components/buttons/ButtonPrimary.vue';
import { ref } from 'vue';
const props = defineProps<{
  locked: boolean,
  isActionPossible?: boolean,
  isEditable: boolean
}>();
const emits = defineEmits<{
  create: [],
  edit: [],
  change: [string],
}>();
const input = defineModel<string>('text');
const domInput = ref<HTMLInputElement | null>(null);

const onButtonCreateAction = () => {
  console.log('> TodoInput -> onButtonCreateAction');
  props.isEditable ? emits('edit') : emits('create');
};
const onInput = () => {
  console.log('> TodoInput -> onInput:', domInput.value!.value);
  emits('change', domInput.value!.value);
};
</script>
<template>
  <div class="flex flex-row space-x-3 items-center">
    <input
      ref="domInput"
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
      @input="onInput"
      @keyup.enter="onButtonCreateAction"
    >
    <ButtonPrimary
      :disabled="locked || !isActionPossible"
      :title="isEditable ? Strings.TODO_BTN__EDIT : Strings.TODO_BTN__CREATE"
      :class="isEditable && '!bg-amber-500'"
      @action="onButtonCreateAction"
    />
    <slot />
  </div>
</template>
