<template lang="pug">
q-page
  .words-set__title.q-py-md
    input(
      v-model="setName"
      type="text"
      maxlength="30"
      :placeholder="$t('set name')"
    )
  .q-px-md
    q-btn.shadow(
      v-if="showSetWords"
      color="dark"
      text-color="white"
      :label="$t('add words to set')"
      style="width: 100%"
      @click="showSetWords = false"
    )
    q-btn.shadow(
      v-if="!showSetWords"
      color="dark"
      text-color="white"
      :label="$t('remove words from set')"
      style="width: 100%"
      @click="showSetWords = true"
    )
  SearchComponent.q-pb-md.q-px-md(v-if="(filteredTerms.length && !showSetWords) || (showSetWords && filteredSetTerms.length)")
  ResponsiveScrollArea(v-if="filteredTerms.length && !showSetWords" :height="scrollAreaHeight")
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
  .q-px-md.absolute-center.full-width.text-center(v-if="!filteredTerms.length && !showSetWords")
    .text-h5.text-grey {{$t('There is nothing')}}
  ResponsiveScrollArea(v-if="showSetWords && filteredSetTerms.length" :height="scrollAreaHeight")
    q-item.items-center(
      clickable
      @click="removeTerm(item.id)"
      dense
      v-for="(item, index) in filteredSetTerms"
      :key="item.id"
      :style="(filteredSetTerms.length-1 !== index) && {'border-bottom': '1px solid gray'}"
      )
      q-item-section
        q-item-label {{ item.term}}
      q-icon(
        size="xs"
        color="negative"
        name="remove"
      )
  .q-px-md.absolute-center.full-width.text-center(v-if="showSetWords && !filteredSetTerms.length")
    .text-h5.text-grey {{$t('There is nothing')}}
q-footer
  q-btn-group(spread)
    q-btn(
      color="warning"
      :label="$t('back')"
      @click="$router.push(`/words/sets/${$route.params.name}`)"
    )
    q-btn(
      :disabled="!(setName && setTerms.length)"
      color="teal"
      :label="$t('save')"
      style="width: 100%"
      @click="saveSet"
    )
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { db } from 'src/db';
import { useLanguagesStore } from 'src/stores/languagesStore';
import { useWordsSets } from 'src/composables/useWordsSets';
//Components
import SearchComponent from 'components/SearchComponent.vue';
import ResponsiveScrollArea from 'components/ResponsiveScrollArea.vue';

import { useRoute, useRouter } from 'vue-router';

const languageStore = useLanguagesStore();

const { editWordsSet } = useWordsSets();

const route = useRoute();
const router = useRouter();

//Refs
const scrollAreaHeight = ref();
const showSetWords = ref(true);

const vocabularyTerms = ref([]);
const setTerms = ref([]);

const setName = ref('');

const filteredTerms = computed(() => {
  return vocabularyTerms.value
    ?.filter((item) => item.term.includes(languageStore.searchValue))
    .sort((a, b) => a.term.localeCompare(b.term));
});

const filteredSetTerms = computed(() => {
  return setTerms.value
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
  await editWordsSet(route.params.name, setName.value, termsIds);
  await router.push(`/words/sets/${route.params.name}`);
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
    document.getElementsByClassName('q-page')[0]?.clientHeight - 200 + 'px';
});
</script>

<style lang="scss">
.words-set__title {
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
