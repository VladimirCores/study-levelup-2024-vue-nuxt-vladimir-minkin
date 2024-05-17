<script setup lang="ts">
import ButtonLink from '~/components/buttons/ButtonLink.vue';
import { useRouter } from 'vue-router';
import { TodosVO } from '~/model';
import todosStore from '~/stores/todosStore.ts';



const router = useRouter();
const todoId = router.currentRoute.value.params.id;
const todos = todosStore.list as TodosVO;
const todo = todos.find((todo) => todo.id === todoId);
</script>
<template>
  <span>Todo Item Page {{ todoId }}</span>
  <di>
    {{ todo }}
  </di>
  <span>
    <ButtonLink title="Home" to="/" />
  </span>
</template>
