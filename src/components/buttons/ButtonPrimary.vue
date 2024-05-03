<script setup lang="ts">
const props = withDefaults(defineProps<{
  title: string,
  isLoading?: boolean,
}>(), {
  isLoading: false
});
const emits = defineEmits<{ action: [] }>();
const onGuardedAction = () => !props.isLoading && emitAction();
const emitAction = () => {
  console.log('> ButtonPrimary -> emitAction');
  emits('action');
};
</script>
<template>
  <button
    type="button"
    class="
      py-3 px-4
      inline-flex items-center gap-x-2
      text-sm text-white font-semibold
      rounded-lg
      border border-transparent
      bg-blue-600 hover:bg-blue-700
      disabled:opacity-50
      disabled:pointer-events-none
    "
    @keyup.enter="onGuardedAction"
    @click.prevent.stop="onGuardedAction"
  >
    {{ title }}
  </button>
</template>
