<template lang="pug">
q-page
  SearchComponent.q-px-md(v-if="irregularVerbs?.value?.length || languagesStore.searchValue")

  ListComponent(
    :items="irregularVerbs")
  .q-px-md.absolute-center.full-width.text-center(v-if="!irregularVerbs?.value?.length")
    .text-h5.text-grey {{$t('There is nothing')}}
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useObservable } from '@vueuse/rxjs';
import { useIrregularVerbs } from 'src/composables/useIrregularVerbs';
import useAppEventBus from 'src/composables/useAppEventBus';

//Components
import SearchComponent from 'components/SearchComponent.vue';
import ListComponent from 'components/ListComponent.vue';

//Stores
import { useLanguagesStore } from 'src/stores/languagesStore';
//
const languagesStore = useLanguagesStore();

const { getFilteredIrregularVerbs } = useIrregularVerbs();

const { $on } = useAppEventBus();

let irregularVerbs = ref();

$on('request-irregular-verbs', () => {
  irregularVerbs.value = useObservable(getFilteredIrregularVerbs());
});

watch(
  () => languagesStore.searchValue || languagesStore.currentLanguage,
  async () => {
    irregularVerbs.value = useObservable(getFilteredIrregularVerbs());
  }
);

onMounted(async () => {
  irregularVerbs.value = useObservable(getFilteredIrregularVerbs());
});
</script>
