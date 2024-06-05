<template lang="pug">
SearchComponent.q-px-md(v-if="terms?.value?.length || languagesStore.searchValue || isTraining")
ListComponent(
  :fetchData="fetchData"
  :fetchFilteredData="fetchFilteredData"
  :items="terms")
.q-px-md.absolute-center.full-width.text-center(v-if="!terms?.value?.length")
  .text-h5.text-grey {{$t('There is nothing')}}
</template>

<script setup>
//Components
import SearchComponent from 'components/SearchComponent.vue';
import ListComponent from 'components/ListComponent.vue';

import useTermsFetcher from 'src/composables/useTermsFetcher';

const props = defineProps({
  getTerms: Function,
  event: String,
});

const { terms, fetchData, isTraining, languagesStore, fetchFilteredData } =
  useTermsFetcher(props.getTerms, props.event);
</script>
