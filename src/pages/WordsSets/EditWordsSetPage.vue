<template lang="pug">
q-page
  .words-set__title.q-py-md
    input(v-model="setName" type="text" maxlength="30" :placeholder="$t('set name')")
  div(v-if="filteredTerms")
    SearchComponent.q-pb-md.q-px-md
    .text-h6.bg-grey-3.q-px-md Add words in a set
    q-scroll-area.q-pr-sm.q-py-md(v-if="filteredTerms" :style="{height:  scrollAreaHeight}" :bar-style="{ right: '0px', background: 'blue', width: '2px', opacity: 0.1 }" :thumb-style="{ right: '0px', background: 'blue', width: '2px', opacity: 0.5 }")
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
    .text-h6.bg-grey-3.q-px-md Words in a set
    q-scroll-area.q-pr-sm.q-pt-md(:style="{height:  scrollAreaHeight}" :bar-style="{ right: '0px', background: 'blue', width: '2px', opacity: 0.1 }" :thumb-style="{ right: '0px', background: 'blue', width: '2px', opacity: 0.5 }")
      q-item.items-center(
        clickable
        @click="removeTerm(item.id)"
        dense
        v-for="(item, index) in setTerms"
        :key="item.id"
        :style="(setTerms.length-1 !== index) && {'border-bottom': '1px solid gray'}"
        )
        q-item-section
          q-item-label {{ item.term}}
        q-icon(
          size="xs"
          color="negative"
          name="remove"
        )
  q-footer
    q-btn-group(spread)
      q-btn(
        color="warning"
        label="Back"
        @click="toPreviousePage"
      )
      q-btn(
        :disabled="!(setName && setTerms.length)"
        color="positive"
        :label="$t('save and exit')"
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
import { useRoute, useRouter } from 'vue-router';
import useUtils from 'src/composables/useUtils';

const languageStore = useLanguagesStore();

const { editWordsSet } = useWordsSets();
const { toPreviousePage } = useUtils();

const route = useRoute();
const router = useRouter();

//Refs
const scrollAreaHeight = ref();
const setName = ref('');

const vocabularyTerms = ref();

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
  await editWordsSet(route.params.name, setName.value, termsIds);
  await router.push('/words/sets');
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
    (document.getElementsByClassName('q-page')[0]?.clientHeight - 240) / 2 +
    'px';
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
