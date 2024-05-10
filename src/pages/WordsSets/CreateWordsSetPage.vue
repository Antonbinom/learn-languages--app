<template lang="pug">
q-page
  div(v-if="filteredTerms")
    q-input.q-pt-md(
      borderless
      v-model="setName"
      :placeholder="$t('set name')"
      maxlength="20"
      )
    SearchComponent.q-pb-md
    .text-h6.bg-grey-3 Add words
    q-scroll-area.q-pr-sm.q-py-md(v-if="filteredTerms" :style="{height:  scrollAreaHeight}" :bar-style="{ right: '0px', background: 'blue', width: '2px', opacity: 0.1 }" :thumb-style="{ right: '0px', background: 'blue', width: '2px', opacity: 0.5 }")
      q-item.q-px-none(
        v-for="(item, index) in filteredTerms"
        :key="item.id"
        :style="(filteredTerms.length-1 !== index) && {'border-bottom': '1px solid gray'}"
        dense
        @click="addTerm(item.id)"
        clickable
        )
        q-item-section
          q-item-label {{ item.term}}
        q-btn(
          flat
          size="xs"
          dense
          color="positive"
          icon="add"
        )
    .text-h6.bg-grey-3 Added words
    q-scroll-area.q-pr-sm.q-pt-md(:style="{height:  scrollAreaHeight}" :bar-style="{ right: '0px', background: 'blue', width: '2px', opacity: 0.1 }" :thumb-style="{ right: '0px', background: 'blue', width: '2px', opacity: 0.5 }")
      q-item.q-px-none(
        v-for="(item, index) in addedTerms"
        :key="item.id"
        :style="(addedTerms.length-1 !== index) && {'border-bottom': '1px solid gray'}"
        dense
        @click="removeTerm(item.id)"
        clickable
        )
        q-item-section
          q-item-label {{ item.term}}
        q-btn(
          flat
          size="xs"
          dense
          color="negative"
          icon="remove"
        )
    q-btn.q-mt-md(
      :disabled="!(setName && addedTerms.length)"
      color="positive"
      :label="$t('create new set')"
      style="width: 100%"
      @click="createSet"
    )
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

const { createWordsSet } = useWordsSets();
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
  if (!setName.value || !addedTerms.value) return;
  const termsIds = addedTerms.value.map((term) => term.id);
  await createWordsSet(setName.value.toLowerCase(), termsIds);
  router.push('/words/sets');
};

onMounted(async () => {
  const { terms } = await db.vocabularies
    .where('lang')
    .equals(languageStore.currentLanguage)
    .first();

  vocabularyTerms.value = terms;

  scrollAreaHeight.value =
    (document.getElementsByClassName('q-page')[0]?.clientHeight - 280) / 2 +
    'px';
});
</script>
