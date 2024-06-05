<template lang="pug">
q-page
  SearchComponent.q-px-md(v-if="sentences?.value?.length || languagesStore.searchValue || isTraining")
  ListComponent(
    :fetchData="fetchData"
    :fetchFilteredData="fetchFilteredData"
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

const { getSentences } = useSentences();

const { $on } = useAppEventBus();

let sentences = ref();
const isTraining = ref(false);

const fetchData = (offset) => {
  const data = useObservable(getSentences(offset));
  setTimeout(() => {
    sentences.value.value?.push(...data?.value);
  }, 200);
};

const fetchFilteredData = (offset, trainingValue) => {
  const data = useObservable(getSentences(offset, trainingValue));
  sentences.value = data;
  isTraining.value = trainingValue;
};

$on('request-sentences', () => {
  sentences.value = useObservable(getSentences(0, isTraining.value));
});

watch(
  () => languagesStore.searchValue || languagesStore.currentLanguage,
  async () => {
    sentences.value = useObservable(getSentences(0, isTraining.value));
  }
);

onMounted(async () => {
  sentences.value = useObservable(getSentences(0, isTraining.value));
});
</script>
