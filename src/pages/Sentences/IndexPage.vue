<template lang="pug">
q-page.q-px-md
  .q-py-md.q-gutter-sm.column
    router-link(v-for="link in links" :key="link.name" :to="link.path")
      q-btn(v-if="link?.show || termsLength" color="white" text-color="dark" style="width: 100%") {{$t(link.name)}}
</template>

<script setup>
import { useVocabulary } from 'src/composables/useVocabulary';
import { ref } from 'vue';
import { onMounted } from 'vue';

const { getVocabulary } = useVocabulary();
const termsLength = ref(0);
const links = [
  {
    name: 'vocabulary',
    path: '/words/vocabulary',
    show: true,
  },
  {
    name: 'collections',
    path: '/words/collections',
  },
  {
    name: 'trainings',
    path: '/trainings/words',
  },
];

onMounted(async () => {
  const { terms } = await getVocabulary();
  termsLength.value = terms.length;
});
</script>
