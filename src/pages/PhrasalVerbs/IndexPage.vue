<template lang="pug">
q-page
  SearchComponent.q-px-md(v-if="phrasalVerbs?.value?.length || languagesStore.searchValue || isTraining")
  ListComponent(
    :fetchData="fetchData"
    :fetchFilteredData="fetchFilteredData"
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

const { getPhrasalVerbs } = usePhrasalVerbs();

const { $on } = useAppEventBus();

const phrasalVerbs = ref();
const isTraining = ref(false);

const fetchData = (offset) => {
  try {
    const data = useObservable(getPhrasalVerbs(offset));
    setTimeout(() => {
      phrasalVerbs.value.value?.push(...data?.value);
    }, 200);
  } catch (error) {
    throw new Error(error.message);
  }
};

const fetchFilteredData = (offset, trainingValue) => {
  const data = useObservable(getPhrasalVerbs(offset, trainingValue));
  phrasalVerbs.value = data;
  isTraining.value = trainingValue;
};

$on('request-phrasal-verbs', () => {
  phrasalVerbs.value = useObservable(getPhrasalVerbs(0, isTraining.value));
});

watch(
  () => languagesStore.searchValue || languagesStore.currentLanguage,
  () => {
    phrasalVerbs.value = useObservable(getPhrasalVerbs(0, isTraining.value));
  }
);

onMounted(async () => {
  phrasalVerbs.value = useObservable(getPhrasalVerbs(0, isTraining.value));
});
</script>
