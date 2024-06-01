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
  SearchComponent.q-pb-md.q-px-md(v-if="(words.length && !showCollectionWords) || (showCollectionWords && collectionWords.length)")
  ResponsiveScrollArea(v-if="words.length && !showCollectionWords" :height="scrollAreaHeight")
    q-item.items-center(
      clickable
      @click="addTerm(item.id)"
      dense
      v-for="(item, index) in filteredWords"
      :key="item.id"
      :style="{'border-bottom': (filteredWords.length-1 !== index) ? '1px solid gray' : 'none'}"
      )
      q-item-section
        q-item-label {{ item.term}}
      q-icon(
        size="xs"
        color="positive"
        name="add"
      )
  .q-px-md.absolute-center.full-width.text-center(v-if="!filteredWords.length && !showCollectionWords")
    .text-h5.text-grey {{$t('There is nothing')}}
  ResponsiveScrollArea(v-if="showCollectionWords && filteredCollectionWords.length" :height="scrollAreaHeight")
    q-item.items-center(
      clickable
      @click="removeTerm(item.id)"
      dense
      v-for="(item, index) in filteredCollectionWords"
      :key="item.id"
      :style="(filteredCollectionWords.length-1 !== index) && {'border-bottom': '1px solid gray'}"
      )
      q-item-section
        q-item-label {{ item.term}}
      q-icon(
        size="xs"
        color="negative"
        name="remove"
      )
  .q-px-md.absolute-center.full-width.text-center(v-if="showCollectionWords && !filteredCollectionWords.length")
    .text-h5.text-grey {{$t('There is nothing')}}
q-footer
  q-btn-group(spread)
    q-btn(
      color="warning"
      :label="$t('back')"
      @click="$router.push(`/words/collections/${$route.params.name}`)"
    )
    q-btn(
      :disabled="!(collectionName && collectionWords.length)"
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

const words = ref([]);
const collectionWords = ref([]);

const collectionName = ref('');

const filterWords = (terms) => {
  return terms
    ?.filter((item) =>
      item.term.toLowerCase().includes(languagesStore.searchValue.toLowerCase())
    )
    .sort((a, b) => a.term.localeCompare(b.term));
};

const filteredWords = computed(() => {
  return filterWords(words.value);
});

const filteredCollectionWords = computed(() => {
  return filterWords(collectionWords.value);
});

const addTerm = (id) => {
  const termIndex = words.value.findIndex((term) => term.id === id);
  collectionWords.value = [
    words.value[termIndex],
    ...collectionWords.value,
  ].sort((a, b) => a.term.localeCompare(b.term));
  words.value.splice(termIndex, 1);
};

const removeTerm = (id) => {
  const termIndex = collectionWords.value.findIndex((term) => term.id === id);
  words.value = [collectionWords.value[termIndex], ...words.value];
  collectionWords.value.splice(termIndex, 1);
};

const saveCollection = async () => {
  if (!collectionName.value) return;
  const termsIds = collectionWords.value.map((term) => term.id);
  await editwordsCollection(route.params.name, collectionName.value, termsIds);
  await router.push(`/words/collections/${route.params.name}`);
};

onMounted(async () => {
  const data = await db.words
    .where('lang')
    .equals(languagesStore.currentLanguage)
    .toArray();

  const { terms: collectionWordsIds, name } = await db.wordsCollections
    .where('lang')
    .equals(languagesStore.currentLanguage)
    .and((collection) => collection.name === route.params.name)
    .first();

  words.value = data.filter((item) => !collectionWordsIds.includes(item.id));
  collectionWords.value = data.filter((item) =>
    collectionWordsIds.includes(item.id)
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
