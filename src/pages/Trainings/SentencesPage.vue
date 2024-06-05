<template lang="pug">
q-page.q-px-md
  .q-py-md.q-gutter-sm.column(v-if="trainingTermsLength.length !== 0")
    router-link(v-for="link in links" :key="link.name" :to="link.path")
      q-btn(color="white" text-color="dark" style="width: 100%") {{$t(link.name)}}
  .q-px-md.absolute-center.full-width.text-center(v-else)
    .text-h5.text-grey {{$t('Add sentences to training')}}
</template>

<script setup>
import { ref, onMounted } from 'vue';

import { useSentences } from 'src/composables/useSentences';
const { getAllSentences } = useSentences();

const trainingTermsLength = ref(0);

const links = [
  {
    name: 'spelling',
    path: '/trainings/sentences/spelling',
  },
  {
    name: 'sentences-constructor',
    path: '/trainings/sentences/sentences-constructor',
  },
  {
    name: 'complete the sentence',
    path: '/trainings/sentences/complete-the-sentence',
  },
];

onMounted(async () => {
  const data = await getAllSentences();
  trainingTermsLength.value = data?.filter((item) => item.training === true);
  // trainingTermsLength.value.length < 4 && links.value.splice(2, 1);
});
</script>
