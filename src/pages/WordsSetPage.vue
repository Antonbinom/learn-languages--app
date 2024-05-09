<template lang="pug">
q-page
  SearchComponent.q-pb-md
  q-scroll-area.q-pr-sm.q-pt-md(:style="{height:  scrollAreaHeight}" :bar-style="{ right: '0px', background: 'blue', width: '2px', opacity: 0.1 }" :thumb-style="{ right: '0px', background: 'blue', width: '2px', opacity: 0.5 }")
    q-item.q-px-none(
      dense
      v-for="(item, index) in filteredTerms"
      :key="item.id"
      :style="(filteredTerms.length-1 !== index) && {'border-bottom': '1px solid gray'}"
      )
      q-item-section
        q-item-label {{ item.term }} - {{ item.translation }}
        q-item-label(caption) {{ item?.explanation }}
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { db } from 'src/db';

import { useLanguagesStore } from 'src/stores/languagesStore';
//Components
import SearchComponent from 'components/SearchComponent.vue';
import { useRoute } from 'vue-router';

const languageStore = useLanguagesStore();

const route = useRoute();
const scrollAreaHeight = ref();
const setName = ref('');
const vocabularyTerms = ref();

const setTerms = ref([]);

const filteredTerms = computed(() => {
  return setTerms.value
    ?.filter((item) => item.term.includes(languageStore.searchValue))
    .sort((a, b) => a.term.localeCompare(b.term));
});

onMounted(async () => {
  const { terms } = await db.vocabularies
    .where('lang')
    .equals(languageStore.currentLanguage)
    .first();

  const { terms: setTermsIds, name } = await db.wordsSets
    .where('lang')
    .equals(languageStore.currentLanguage)
    .and((set) => set.name === route.params.name)
    .first();

  vocabularyTerms.value = terms.filter(
    (item) => !setTermsIds.includes(item.id)
  );
  setTerms.value = terms.filter((item) => setTermsIds.includes(item.id));
  setName.value = name;
  scrollAreaHeight.value =
    document.getElementsByClassName('q-page')[0]?.clientHeight - 80 + 'px';
});
</script>
