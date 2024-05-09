<template lang="pug">
q-page
  q-input.q-pt-md(
    borderless
    v-model="setName"
    :placeholder="$t('set name')"
    )
  SearchComponent.q-pb-md
  .text-h6.bg-grey-3 Add words in a set
  q-scroll-area.q-pr-sm.q-py-md(v-if="filteredTerms" :style="{height:  scrollAreaHeight}" :bar-style="{ right: '0px', background: 'blue', width: '2px', opacity: 0.1 }" :thumb-style="{ right: '0px', background: 'blue', width: '2px', opacity: 0.5 }")
    q-item.q-px-none(
      dense
      v-for="(item, index) in filteredTerms"
      :key="item.id"
      :style="(filteredTerms.length-1 !== index) && {'border-bottom': '1px solid gray'}"
      )
      q-item-section
        q-item-label {{ item.term}}
      q-btn(
        flat
        size="xs"
        dense
        color="primary"
        icon="add"
        @click="addTerm(item.id)"
      )
  .text-h6.bg-grey-3 Words in a set
  q-scroll-area.q-pr-sm.q-pt-md(:style="{height:  scrollAreaHeight}" :bar-style="{ right: '0px', background: 'blue', width: '2px', opacity: 0.1 }" :thumb-style="{ right: '0px', background: 'blue', width: '2px', opacity: 0.5 }")
    q-item.q-px-none(
      dense
      v-for="(item, index) in setTerms"
      :key="item.id"
      :style="(setTerms.length-1 !== index) && {'border-bottom': '1px solid gray'}"
      )
      q-item-section
        q-item-label {{ item.term}}
      q-btn(
        flat
        size="xs"
        dense
        color="negative"
        icon="remove"
        @click="removeTerm(item.id)"
      )
  q-btn-group(spread flat)
    q-btn.q-mr-md(
      color="negative"
      :label="$t('delete')"
      @click="removeSet"
    )
    q-btn(
      :disabled="!(setName && setTerms.length)"
      color="positive"
      :label="$t('save')"
      @click="saveSet"
    )
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { db } from 'src/db';
import useUtils from 'src/composables/useUtils';

import { useLanguagesStore } from 'src/stores/languagesStore';
import { useWordsSets } from 'src/composables/useWordsSets';
//Components
import SearchComponent from 'components/SearchComponent.vue';
import { useRoute } from 'vue-router';

const languageStore = useLanguagesStore();

const { addTermsToWordsSet, removeWordsSet } = useWordsSets();
const route = useRoute();
const scrollAreaHeight = ref();
const setName = ref('');
const vocabularyTerms = ref();
const { toPreviousePage } = useUtils();

const setTerms = ref([]);

const filteredTerms = computed(() => {
  return vocabularyTerms.value
    ?.filter((item) => item.term.includes(languageStore.searchValue))
    .sort((a, b) => a.term.localeCompare(b.term));
});

const addTerm = (id) => {
  const termIndex = vocabularyTerms.value.findIndex((term) => term.id === id);
  setTerms.value = [vocabularyTerms.value[termIndex], ...setTerms.value].sort(
    (a, b) => a.term.localeCompare(b.term)
  );
  vocabularyTerms.value.splice(termIndex, 1);
};

const removeTerm = (id) => {
  const termIndex = setTerms.value.findIndex((term) => term.id === id);
  vocabularyTerms.value = [setTerms.value[termIndex], ...vocabularyTerms.value];
  setTerms.value.splice(termIndex, 1);
};

const saveSet = async () => {
  if (!setName.value) return;
  const termsIds = setTerms.value.map((term) => term.id);
  await addTermsToWordsSet(setName.value, termsIds);
};

const removeSet = async () => {
  await removeWordsSet(setName.value);
  toPreviousePage();
};

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
    (document.getElementsByClassName('q-page')[0]?.clientHeight - 280) / 2 +
    'px';
});
</script>
