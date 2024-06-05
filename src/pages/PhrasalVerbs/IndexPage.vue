<template lang="pug">
q-page
  TermsList(:getTerms="getPhrasalVerbs", event="request-phrasal-verbs")
</template>

<script setup>
import TermsList from 'components/TermsList.vue';
import { usePhrasalVerbs } from 'src/composables/usePhrasalVerbs';
const { getPhrasalVerbs } = usePhrasalVerbs();
</script>
