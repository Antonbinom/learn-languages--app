<template lang="pug">
q-page
  .words-collection__title.q-py-md
    input(
      v-model="collectionName"
      type="text"
      maxlength="30"
      :placeholder="$t('collection name')"
    )
  .q-px-md
    q-btn.shadow(
      v-if="showCollectionWords"
      color="dark"
      text-color="white"
      :label="$t('add words to collection')"
      style="width: 100%"
      @click="showCollectionWords = false"
    )
    q-btn.shadow(
      v-if="!showCollectionWords"
      color="dark"
      text-color="white"
      :label="$t('remove words from collection')"
      style="width: 100%"
      @click="showCollectionWords = true"
    )
  SearchComponent.q-pb-md.q-px-md(v-if="(filteredTerms.length && !showCollectionWords) || (showCollectionWords && filteredCollectionTerms.length)")
  ResponsiveScrollArea(v-if="filteredTerms.length && !showCollectionWords" :height="scrollAreaHeight")
    q-item.items-center(
      clickable
      @click="addTerm(item.id)"
      dense
      v-for="(item, index) in filteredTerms"
      :key="item.id"
      :style="{'border-bottom': (filteredTerms.length-1 !== index) ? '1px solid gray' : 'none'}"
      )
      q-item-section
        q-item-label {{ item.term}}
      q-icon(
        size="xs"
        color="positive"
        name="add"
      )
  .q-px-md.absolute-center.full-width.text-center(v-if="!filteredTerms.length && !showCollectionWords")
    .text-h5.text-grey {{$t('There is nothing')}}
  ResponsiveScrollArea(v-if="showCollectionWords && filteredCollectionTerms.length" :height="scrollAreaHeight")
    q-item.items-center(
      clickable
      @click="removeTerm(item.id)"
      dense
      v-for="(item, index) in filteredCollectionTerms"
      :key="item.id"
      :style="(filteredCollectionTerms.length-1 !== index) && {'border-bottom': '1px solid gray'}"
      )
      q-item-section
        q-item-label {{ item.term}}
      q-icon(
        size="xs"
        color="negative"
        name="remove"
      )
  .q-px-md.absolute-center.full-width.text-center(v-if="showCollectionWords && !filteredCollectionTerms.length")
    .text-h5.text-grey {{$t('There is nothing')}}
q-footer
  q-btn-group(spread)
    q-btn(
      color="warning"
      :label="$t('back')"
      @click="$router.push(`/words/collections/${$route.params.name}`)"
    )
    q-btn(
      :disabled="!(collectionName && collectionTerms.length)"
      color="teal"
      :label="$t('save')"
      style="width: 100%"
      @click="saveCollection"
    )
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { db } from 'src/db';
import { useLanguagesStore } from 'src/stores/languagesStore';
import { useWordsCollections } from 'src/composables/useWordsCollections';
//Components
import SearchComponent from 'components/SearchComponent.vue';
import ResponsiveScrollArea from 'components/ResponsiveScrollArea.vue';

import { useRoute, useRouter } from 'vue-router';

const languagesStore = useLanguagesStore();

const { editwordsCollection } = useWordsCollections();

const route = useRoute();
const router = useRouter();

//Refs
const scrollAreaHeight = ref();
const showCollectionWords = ref(true);

const vocabularyTerms = ref([]);
const collectionTerms = ref([]);

const collectionName = ref('');

const filterTerms = (terms) => {
  return terms
    ?.filter((item) =>
      item.term.toLowerCase().includes(languagesStore.searchValue.toLowerCase())
    )
    .sort((a, b) => a.term.localeCompare(b.term));
};

const filteredTerms = computed(() => {
  return filterTerms(vocabularyTerms.value);
});

const filteredCollectionTerms = computed(() => {
  return filterTerms(collectionTerms.value);
});

const addTerm = (id) => {
  const termIndex = vocabularyTerms.value.findIndex((term) => term.id === id);
  collectionTerms.value = [
    vocabularyTerms.value[termIndex],
    ...collectionTerms.value,
  ].sort((a, b) => a.term.localeCompare(b.term));
  vocabularyTerms.value.splice(termIndex, 1);
};

const removeTerm = (id) => {
  const termIndex = collectionTerms.value.findIndex((term) => term.id === id);
  vocabularyTerms.value = [
    collectionTerms.value[termIndex],
    ...vocabularyTerms.value,
  ];
  collectionTerms.value.splice(termIndex, 1);
};

const saveCollection = async () => {
  if (!collectionName.value) return;
  const termsIds = collectionTerms.value.map((term) => term.id);
  await editwordsCollection(route.params.name, collectionName.value, termsIds);
  await router.push(`/words/collections/${route.params.name}`);
};

onMounted(async () => {
  const { terms } = await db.vocabularies
    .where('lang')
    .equals(languagesStore.currentLanguage)
    .first();

  const { terms: collectionTermsIds, name } = await db.wordsCollections
    .where('lang')
    .equals(languagesStore.currentLanguage)
    .and((collection) => collection.name === route.params.name)
    .first();

  vocabularyTerms.value = terms.filter(
    (item) => !collectionTermsIds.includes(item.id)
  );
  collectionTerms.value = terms.filter((item) =>
    collectionTermsIds.includes(item.id)
  );
  collectionName.value = name;
  scrollAreaHeight.value =
    document.getElementsByClassName('q-page')[0]?.clientHeight - 200 + 'px';
});
</script>

<style lang="scss">
.words-collection__title {
  display: flex;
  justify-content: center;
  width: 100%;
  & input {
    font-size: 21px;
    border: none;
    border-bottom: 2px solid black;
    outline: none;
    &:focus {
      outline-color: transparent;
    }
  }
}
</style>
