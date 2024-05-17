<script setup lang="ts">
import ButtonLink from '~/components/buttons/ButtonLink.vue';
import { useRouter } from 'vue-router';
import { inject } from 'vue';
import { PROVIDE_KEY_TODOS } from '~/constants';
import TodosStore from '~/stores/todosStore.ts';
import { TodoVO } from '~/model';

const router = useRouter();
const todoId = router.currentRoute.value.params.id;
const todos = (inject(PROVIDE_KEY_TODOS) as TodosStore).list;
const todo = todos.find((todo: TodoVO) => todo.id === todoId);
</script>
<template>
  <span>Todo Item Page {{ todoId }}</span>
  <div>
    {{ todo }}
  </div>
  <span>
    <ButtonLink title="Home" to="/" />
  </span>
</template>
