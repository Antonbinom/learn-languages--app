<template lang="pug">
q-page
  TermsList(:getTerms="getSentences", event="request-sentences")
</template>

<script setup lang="ts">
import TermsList from 'components/TermsList.vue';
import { useSentences } from 'src/composables/useSentences';
const { getSentences } = useSentences();
</script>
