<template lang="pug">
q-page
  SearchComponent
  ListComponent(
    :items="currentLanguageWords")
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
