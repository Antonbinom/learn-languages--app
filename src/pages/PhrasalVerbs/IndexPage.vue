<template lang="pug">
q-page
  SearchComponent.q-px-md(v-if="phrasalVerbs?.value?.length || languagesStore.searchValue")
  ListComponent(
    :items="phrasalVerbs")
  .q-px-md.absolute-center.full-width.text-center(v-if="!phrasalVerbs?.value?.length")
    .text-h5.text-grey {{$t('There is nothing')}}
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useObservable } from '@vueuse/rxjs';
import { usePhrasalVerbs } from 'src/composables/usePhrasalVerbs';
import useAppEventBus from 'src/composables/useAppEventBus';

//Components
import SearchComponent from 'components/SearchComponent.vue';
import ListComponent from 'components/ListComponent.vue';

//Stores
import { useLanguagesStore } from 'src/stores/languagesStore';
//
const languagesStore = useLanguagesStore();

const { getFilteredPhrasalVerbs } = usePhrasalVerbs();

const { $on } = useAppEventBus();

const phrasalVerbs = ref();
$on('request-phrasal-verbs', () => {
  phrasalVerbs.value = useObservable(getFilteredPhrasalVerbs());
});

watch(
  () => languagesStore.searchValue || languagesStore.currentLanguage,
  () => {
    phrasalVerbs.value = useObservable(getFilteredPhrasalVerbs());
  }
);

onMounted(async () => {
  phrasalVerbs.value = useObservable(getFilteredPhrasalVerbs());
});
</script>
