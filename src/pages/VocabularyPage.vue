<template lang="pug">
q-page.items-center.justify-evenly
  SearchComponent
  ListComponent(
    :items="currentLanguageWords")
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

const { getVocabulary } = useVocabulary();

const { $on } = useAppEventBus();

let currentLanguageWords = ref();

$on('request-vocabulary', () => {
  currentLanguageWords.value = useObservable(getVocabulary());
});

watch(
  () => languagesStore.searchValue || languagesStore.currentLanguage,
  async () => {
    currentLanguageWords.value = useObservable(getVocabulary());
  }
);

onMounted(async () => {
  currentLanguageWords.value = useObservable(getVocabulary());
});
</script>
