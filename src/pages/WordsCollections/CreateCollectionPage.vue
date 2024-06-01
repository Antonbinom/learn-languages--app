<template lang="pug">
q-page
  div(v-if="filteredWords")
    q-input.q-pt-md.q-px-md(
      borderless
      v-model="collectionName"
      :placeholder="$t('collection name')"
      maxlength="20"
      )
    SearchComponent(v-if="filteredWords?.length").q-pb-md.q-px-md
    .text-h6.bg-grey-3.q-px-md(v-if="filteredWords?.length") Add words
    ResponsiveScrollArea(v-if="filteredWords?.length" :height="scrollAreaHeight")
      q-item(
        v-for="(item, index) in filteredWords"
        :key="item.id"
        :style="(filteredWords.length-1 !== index) && {'border-bottom': '1px solid gray'}"
        dense
        @click="addWord(item.id)"
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
    .text-h6.bg-grey-3.q-px-md(v-if="addedWords.length") Added words
    ResponsiveScrollArea(v-if="addedWords?.length" :height="scrollAreaHeight")
      q-item(
        v-for="(item, index) in addedWords"
        :key="item.id"
        :style="(addedWords.length-1 !== index) && {'border-bottom': '1px solid gray'}"
        dense
        @click="removeWord(item.id)"
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
      @click="(collectionName && addedWords.length) && createCollection()"
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
const words = ref();
const addedWords = ref([]);

const filteredWords = computed(() => {
  return words.value
    ?.filter((item) =>
      item.term.toLowerCase().includes(languagesStore.searchValue.toLowerCase())
    )
    .sort((a, b) => a.term.localeCompare(b.term));
});

const addWord = (id) => {
  const termIndex = words.value.findIndex((term) => term.id === id);
  addedWords.value = [words.value[termIndex], ...addedWords.value].sort(
    (a, b) => a.term.localeCompare(b.term)
  );
  words.value.splice(termIndex, 1);
};

const removeWord = (id) => {
  const termIndex = addedWords.value.findIndex((term) => term.id === id);
  words.value = [addedWords.value[termIndex], ...words.value];
  addedWords.value.splice(termIndex, 1);
};
const createCollection = async () => {
  if (!collectionName.value || !addedWords.value) return;
  const wordsIds = addedWords.value.map((term) => term.id);
  await createWordsCollection(collectionName.value, wordsIds);
  router.push('/words/collections');
};

onMounted(async () => {
  const data = await db.words
    .where('lang')
    .equals(languagesStore.currentLanguage)
    .toArray();

  words.value = data;

  scrollAreaHeight.value =
    (document.getElementsByClassName('q-page')[0]?.clientHeight - 280) / 2 +
    'px';
});
</script>
