<template lang="pug">
q-page
  TermsList(:getTerms="getPhrasalVerbs", event="request-phrasal-verbs")
</template>

<script setup lang="ts">
import TermsList from 'components/TermsList.vue';
import { usePhrasalVerbs } from 'src/composables/usePhrasalVerbs';
const { getPhrasalVerbs } = usePhrasalVerbs();
</script>
