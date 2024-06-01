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
import { useVocabulary } from 'src/composables/useVocabulary';
import useAppEventBus from 'src/composables/useAppEventBus';

//Components
import SearchComponent from 'components/SearchComponent.vue';
import ListComponent from 'components/ListComponent.vue';

//Stores
import { useLanguagesStore } from 'src/stores/languagesStore';
//
const languagesStore = useLanguagesStore();

const { getWords } = useVocabulary();

const { $on } = useAppEventBus();

let currentLanguageWords = ref();

$on('request-words', () => {
  currentLanguageWords.value = useObservable(getWords());
});

watch(
  () => languagesStore.searchValue || languagesStore.currentLanguage,
  async () => {
    currentLanguageWords.value = useObservable(getWords());
  }
);

onMounted(async () => {
  currentLanguageWords.value = useObservable(getWords());
});
</script>
