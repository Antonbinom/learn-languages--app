<template lang="pug">
q-page
  .flex.justify-between.items-center.q-mt-md.q-mb-sm
  q-input(filled v-model="setName" :label="$t('set name')")
  SearchComponent
  q-scroll-area(v-if="filteredTerms" :style="{height:  scrollAreaHeight}" :bar-style="{ right: '0px', background: 'blue', width: '2px', opacity: 0.1 }" :thumb-style="{ right: '0px', background: 'blue', width: '2px', opacity: 0.5 }")
    q-item.q-px-none(v-for="(item) in filteredTerms" :key="item.id" :style="{'border-bottom': '1px solid gray'}")
      q-item-section
        q-item-label {{ item.term}}
      q-btn(
        square
        dense
        color="primary"
        icon="add"
        @click="addTerm(item.id)"
      )
  q-scroll-area(v-if="addedTerms?.length" :style="{height:  scrollAreaHeight}" :bar-style="{ right: '0px', background: 'blue', width: '2px', opacity: 0.1 }" :thumb-style="{ right: '0px', background: 'blue', width: '2px', opacity: 0.5 }")
    q-item.q-px-none(v-for="(item) in addedTerms" :key="item.id" :style="{'border-bottom': '1px solid gray'}")
      q-item-section
        q-item-label {{ item.term}}
      q-btn(
        square
        dense
        color="negative"
        icon="remove"
        @click="removeTerm(item.id)"
      )
  q-btn(color="positive" label="create" style="width: 100%" @click="createSet")
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { db } from 'src/db';
import { useLanguagesStore } from 'src/stores/languagesStore';
import { useWordsSets } from 'src/composables/useWordsSets';
//Components
import SearchComponent from 'components/SearchComponent.vue';
import { useRouter } from 'vue-router';

const languageStore = useLanguagesStore();

const { addTermsToWordsSet } = useWordsSets();
const router = useRouter();
const scrollAreaHeight = ref();
const setName = ref('');
const vocabularyTerms = ref();
const addedTerms = ref([]);

const filteredTerms = computed(() => {
  return vocabularyTerms.value
    ?.filter((item) => item.term.includes(languageStore.searchValue))
    .sort((a, b) => a.term.localeCompare(b.term));
});

const addTerm = (id) => {
  const termIndex = vocabularyTerms.value.findIndex((term) => term.id === id);
  addedTerms.value = [
    vocabularyTerms.value[termIndex],
    ...addedTerms.value,
  ].sort((a, b) => a.term.localeCompare(b.term));
  vocabularyTerms.value.splice(termIndex, 1);
};

const removeTerm = (id) => {
  const termIndex = addedTerms.value.findIndex((term) => term.id === id);
  vocabularyTerms.value = [
    addedTerms.value[termIndex],
    ...vocabularyTerms.value,
  ];
  addedTerms.value.splice(termIndex, 1);
};
const createSet = async () => {
  const termsIds = addedTerms.value.map((term) => term.id);
  await addTermsToWordsSet(setName.value, termsIds);
  router.push('/words/sets');
};

onMounted(async () => {
  const { terms } = await db.vocabularies
    .where('lang')
    .equals(languageStore.currentLanguage)
    .first();

  vocabularyTerms.value = terms;

  scrollAreaHeight.value =
    document.getElementsByClassName('q-page')[0]?.clientHeight - 140 + 'px';
});
</script>
