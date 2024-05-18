<template lang="pug">
q-page
  div(v-if="filteredTerms")
    q-input.q-pt-md.q-px-md(
      borderless
      v-model="collectionName"
      :placeholder="$t('collection name')"
      maxlength="20"
      )
    SearchComponent(v-if="filteredTerms?.length").q-pb-md.q-px-md
    .text-h6.bg-grey-3.q-px-md(v-if="filteredTerms?.length") Add words
    ResponsiveScrollArea(v-if="filteredTerms?.length" :height="scrollAreaHeight")
      q-item(
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
    .text-h6.bg-grey-3.q-px-md(v-if="addedTerms.length") Added words
    ResponsiveScrollArea(v-if="addedTerms?.length" :height="scrollAreaHeight")
      q-item(
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
  q-footer
    q-btn.q-py-sm(
      color="warning"
      :label="$t('create new collection')"
      style="width: 100%"
      @click="(collectionName && addedTerms.length) && createCollection()"
    )
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { db } from 'src/db';
import { useLanguagesStore } from 'src/stores/languagesStore';
import { useWordsCollections } from 'src/composables/useWordsCollections';
import { useRouter } from 'vue-router';
//Components
import SearchComponent from 'components/SearchComponent.vue';
import ResponsiveScrollArea from 'components/ResponsiveScrollArea.vue';

const languagesStore = useLanguagesStore();

const { createWordsCollection } = useWordsCollections();
const router = useRouter();
const scrollAreaHeight = ref();
const collectionName = ref('');
const vocabularyTerms = ref();
const addedTerms = ref([]);

const filteredTerms = computed(() => {
  return vocabularyTerms.value
    ?.filter((item) =>
      item.term.toLowerCase().includes(languagesStore.searchValue.toLowerCase())
    )
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
const createCollection = async () => {
  if (!collectionName.value || !addedTerms.value) return;
  const termsIds = addedTerms.value.map((term) => term.id);
  await createWordsCollection(collectionName.value, termsIds);
  router.push('/words/collections');
};

onMounted(async () => {
  const { terms } = await db.vocabularies
    .where('lang')
    .equals(languagesStore.currentLanguage)
    .first();

  vocabularyTerms.value = terms;

  scrollAreaHeight.value =
    (document.getElementsByClassName('q-page')[0]?.clientHeight - 280) / 2 +
    'px';
});
</script>
