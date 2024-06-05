<template lang="pug">
q-page.q-px-md
  .q-py-md.q-gutter-sm.column(v-if="trainingTermsLength.length !== 0")
    router-link(v-for="link in links" :key="link.name" :to="link.path")
      q-btn(color="white" text-color="dark" style="width: 100%") {{$t(link.name)}}
  .q-px-md.absolute-center.full-width.text-center(v-else)
    .text-h5.text-grey {{$t('Add irregular verbs to training')}}
</template>

<script setup>
import { ref, onMounted } from 'vue';

import { useIrregularVerbs } from 'src/composables/useIrregularVerbs';
const { getAllIrregularVerbs } = useIrregularVerbs();

const trainingTermsLength = ref(0);

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
  const data = await getAllIrregularVerbs();
  trainingTermsLength.value = data?.filter((item) => item.training === true);
  trainingTermsLength.value.length < 4 && links.value.splice(2, 1);
});
</script>
