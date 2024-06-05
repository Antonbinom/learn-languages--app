<template lang="pug">
q-page
  TermsList(:getTerms="getWords", event="request-words")
</template>

<script setup>
import TermsList from 'components/TermsList.vue';
import { useVocabulary } from 'src/composables/useVocabulary';
const { getWords } = useVocabulary();
</script>
