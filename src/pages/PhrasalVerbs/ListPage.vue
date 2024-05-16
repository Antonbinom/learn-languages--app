<template lang="pug">
q-page
  SearchComponent.q-px-md(v-if="currentLanguageWords?.value?.length || languagesStore.searchValue")
  ListComponent(
    :items="currentLanguageWords")
  .q-px-md.absolute-center.full-width.text-center(v-if="!currentLanguageWords?.value?.length")
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

const { getPhrasalVerbsCollection } = usePhrasalVerbs();

const { $on } = useAppEventBus();

let currentLanguageWords = ref();

$on('request-phrasal-verbs', () => {
  currentLanguageWords.value = useObservable(getPhrasalVerbsCollection());
});

watch(
  () => languagesStore.searchValue || languagesStore.currentLanguage,
  async () => {
    currentLanguageWords.value = useObservable(getPhrasalVerbsCollection());
  }
);

onMounted(async () => {
  currentLanguageWords.value = useObservable(getPhrasalVerbsCollection());
});
</script>
