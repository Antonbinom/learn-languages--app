<template lang="pug">
q-page
  q-header(elevated).bg-white.text-center
    q-toolbar
      q-toolbar-title.text-dark.text-capitalize {{ currentPageTitle }}
  SearchComponent.q-px-md(v-if="filteredWords?.length || languagesStore.searchValue")
  ResponsiveScrollArea(v-if="filteredWords?.length" :height="scrollAreaHeight")
    q-item.q-px-none.list-item(
      v-for="(item) in filteredWords"
      :key="item.id"
      :style="{'border-bottom': '1px solid gray'}"
      )
      q-expansion-item.list-item__accordion(
        dense
        style="width: 200%"
        :hide-expand-icon="!item.explanation"
        expand-icon-toggle
        expand-separator
        :caption="item.translation"
        :label="`${item.term}`"
        )
        q-card(v-if="item.explanation")
          q-card-section.q-pb-none.q-pt-xs {{ item.explanation }}
q-footer
  q-btn-group(spread)
    q-btn(
      color="warning"
      :label="$t('back')"
      @click="$router.push('/words/collections')"
    )
    q-btn(
      color="teal"
      :label="$t('edit')"
      @click="$router.push(`/words/collections/edit/${$route.params.name}`)"
    )
.q-px-md.absolute-center.full-width.text-center(v-if="!filteredWords?.length")
  .text-h5.text-grey {{$t('There is nothing')}}
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { db } from 'src/db';
import useUtils from 'src/composables/useUtils';
import { useLanguagesStore } from 'src/stores/languagesStore';
//Components
import SearchComponent from 'components/SearchComponent.vue';
import ResponsiveScrollArea from 'components/ResponsiveScrollArea.vue';

import { useRoute } from 'vue-router';

const languagesStore = useLanguagesStore();

const route = useRoute();

const { currentPageTitle } = useUtils();

const scrollAreaHeight = ref();
const collectionName = ref('');
const words = ref();
const collectionWords = ref([]);
const filteredWords = computed(() => {
  return collectionWords.value
    ?.filter(
      (item) =>
        item.term
          .toLowerCase()
          .includes(languagesStore.searchValue.toLowerCase()) ||
        item.translation
          .toLowerCase()
          .includes(languagesStore.searchValue.toLowerCase())
    )
    .sort((a, b) => a.term.localeCompare(b.term));
});

onMounted(async () => {
  const data = await db.words
    .where('lang')
    .equals(languagesStore.currentLanguage)
    .toArray();

  const { terms: collectionTermsIds, name } = await db.wordsCollections
    .where('lang')
    .equals(languagesStore.currentLanguage)
    .and((collection) => collection.name === route.params.name)
    .first();

  words.value = data.filter((item) => !collectionTermsIds.includes(item.id));
  collectionWords.value = data.filter((item) =>
    collectionTermsIds.includes(item.id)
  );
  collectionName.value = name;
  scrollAreaHeight.value =
    document.getElementsByClassName('q-page')[0]?.clientHeight - 80 + 'px';
});
</script>

<style lang="scss">
.list-item {
  cursor: pointer;
}
</style>
