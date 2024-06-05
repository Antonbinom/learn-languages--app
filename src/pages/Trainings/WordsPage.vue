<template lang="pug">
q-page.q-px-md
  .q-py-md.q-gutter-sm.column(v-if="trainingTermsLength.length !== 0")
    router-link(v-for="link in links" :key="link.name" :to="link.path")
      q-btn(color="white" text-color="dark" style="width: 100%") {{$t(link.name)}}
  .q-px-md.absolute-center.full-width.text-center(v-else)
    .text-h5.text-grey {{$t('Add words to training')}}
</template>

<script setup>
import { useVocabulary } from 'src/composables/useVocabulary';
import { onMounted, ref } from 'vue';
const { getAllWords } = useVocabulary();

const trainingTermsLength = ref(0);

const links = ref([
  {
    name: 'sprint',
    path: '/trainings/words/sprint',
  },
  {
    name: 'spelling',
    path: '/trainings/words/spelling',
  },
  {
    name: 'quiz',
    path: '/trainings/words/quiz',
  },
  {
    name: 'repeat',
    path: '/trainings/words/repeat',
  },
]);

onMounted(async () => {
  const data = await getAllWords();
  trainingTermsLength.value = data?.filter((item) => item.training === true);
  trainingTermsLength.value.length < 4 && links.value.splice(2, 1);
});
</script>
