<template lang="pug">
q-page
  TermsList(:getTerms="getIrregularVerbs", event="request-irregular-verbs")
</template>

<script setup lang="ts">
import TermsList from 'components/TermsList.vue';
import { useIrregularVerbs } from 'src/composables/useIrregularVerbs';
const { getIrregularVerbs } = useIrregularVerbs();
</script>
