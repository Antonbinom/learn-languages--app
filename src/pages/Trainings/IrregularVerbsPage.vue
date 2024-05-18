<template lang="pug">
q-page.q-px-md
  .q-py-md.q-gutter-sm.column
    router-link(v-for="link in links" :key="link.name" :to="link.path")
      q-btn(color="white" text-color="dark" style="width: 100%") {{$t(link.name)}}
</template>

<script setup>
import { ref, onMounted } from 'vue';

import { useIrregularVerbs } from 'src/composables/useIrregularVerbs';
const { getIrregularVerbs } = useIrregularVerbs();

const links = ref([
  {
    name: 'sprint',
    path: '/trainings/irregular-verbs/sprint',
    show: true,
  },
  {
    name: 'spelling',
    path: '/trainings/irregular-verbs/spelling',
    show: true,
  },
  {
    name: 'quiz',
    path: '/trainings/irregular-verbs/quiz',
    show: true,
  },
  {
    name: 'repeat',
    path: '/trainings/irregular-verbs/repeat',
    show: true,
  },
]);

onMounted(async () => {
  const { terms } = await getIrregularVerbs();
  terms?.length < 4 && links.value.splice(2, 1);
});
</script>
