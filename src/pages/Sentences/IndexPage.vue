<template lang="pug">
q-page
  SearchComponent.q-px-md(v-if="sentences?.value?.length || languagesStore.searchValue")
  ListComponent(
    :items="sentences")
  .q-px-md.absolute-center.full-width.text-center(v-if="!sentences?.value?.length")
    .text-h5.text-grey {{$t('There is nothing')}}
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useObservable } from '@vueuse/rxjs';
import { useSentences } from 'src/composables/useSentences';
import useAppEventBus from 'src/composables/useAppEventBus';

//Components
import SearchComponent from 'components/SearchComponent.vue';
import ListComponent from 'components/ListComponent.vue';

//Stores
import { useLanguagesStore } from 'src/stores/languagesStore';
//
const languagesStore = useLanguagesStore();

const { getFilteredSentences } = useSentences();

const { $on } = useAppEventBus();

let sentences = ref();

$on('request-sentences', () => {
  sentences.value = useObservable(getFilteredSentences());
});

watch(
  () => languagesStore.searchValue || languagesStore.currentLanguage,
  async () => {
    sentences.value = useObservable(getFilteredSentences());
  }
);

onMounted(async () => {
  sentences.value = useObservable(getFilteredSentences());
});
</script>
