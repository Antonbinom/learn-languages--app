<template lang="pug">
q-page.q-px-md
  .q-py-md.q-gutter-sm.column
    router-link(v-for="link in links" :key="link.name" :to="link.path")
      q-btn(color="white" text-color="dark" style="width: 100%") {{$t(link.name)}}
</template>

<script setup>
import { usePhrasalVerbs } from 'src/composables/usePhrasalVerbs';
import { ref, onMounted } from 'vue';

const { getPhrasalVerbs } = usePhrasalVerbs();
const links = ref([
  {
    name: 'sprint',
    path: '/trainings/phrasal-verbs/sprint',
    show: true,
  },
  {
    name: 'spelling',
    path: '/trainings/phrasal-verbs/spelling',
    show: true,
  },
  {
    name: 'quiz',
    path: '/trainings/phrasal-verbs/quiz',
    show: true,
  },
  {
    name: 'repeat',
    path: '/trainings/phrasal-verbs/repeat',
    show: true,
  },
]);

onMounted(async () => {
  const { terms } = await getPhrasalVerbs();
  terms?.length < 4 && links.value.splice(2, 1);
});
</script>
