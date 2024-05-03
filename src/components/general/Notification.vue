<script setup lang="ts">
import { NotificationType } from '~/enums';
import { onMounted } from 'vue';
import NotificationBase from './base/NotificationBase.vue';
const props = defineProps<{ message: string, type: NotificationType}>();
const emits = defineEmits<{ close: [] }>();
let closeTimerId: any = -1;
onMounted(() => {
  console.log('> Notification -> onMounted', props.message);
  if (closeTimerId >= 0) { clearTimeout(closeTimerId); }
  closeTimerId = setTimeout(() => {
    closeTimerId = -1;
    emits('close');
  }, 5 * 1000);
});
const typeToSettings = {
  [NotificationType.INFO]: { color: 'blue', title: 'Info' },
  [NotificationType.ERROR]: { color: 'red', title: 'Error' },
  [NotificationType.SUCCESS]: { color: 'green', title: 'Success' },
};
</script>
<template>
  <div class="fixed bottom-2 w-screen px-4">
    <NotificationBase
      v-bind="typeToSettings[type]"
      :message="message"
      @close="emits('close')"
    />
  </div>
</template>
