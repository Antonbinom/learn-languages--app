<template lang="pug">
q-page.q-px-md
  .q-py-md.q-gutter-sm.column(v-if="trainingTermsLength.length !== 0")
    router-link(v-for="link in links" :key="link.name" :to="link.path")
      q-btn(color="white" text-color="dark" style="width: 100%") {{$t(link.name)}}
  .q-px-md.absolute-center.full-width.text-center(v-else)
    .text-h5.text-grey {{$t('Add phrasal verbs to training')}}
</template>

<script setup>
import { usePhrasalVerbs } from 'src/composables/usePhrasalVerbs';
import { ref, onMounted } from 'vue';

const { getAllPhrasalVerbs } = usePhrasalVerbs();

const trainingTermsLength = ref(0);

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
  const data = await getAllPhrasalVerbs();
  trainingTermsLength.value = data?.filter((item) => item.training === true);
  trainingTermsLength.value.length < 4 && links.value.splice(2, 1);
});
</script>
