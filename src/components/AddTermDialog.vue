<template lang="pug">
q-dialog(
  maximized
  persistent
  transition-show="slide-up"
  transition-hide="slide-down"
  :model-value="isAddTermOpen"
  )
  q-card(class="bg-white text-white")
    q-toolbar(class="bg-primary text-white text-center")
      q-toolbar-title Add {{ $t(currentPageTitle) }}
    q-card-section(dense)
     .text-h6.text-dark Term
      q-input(v-model="item.term" placeholder="Input term" dense)
    q-card-section(dense)
      .text-h6.text-dark Translation
      q-input(v-model="item.translation" placeholder="Input translation" dense)
    q-card-section(dense)
      .text-h6.text-dark Explanation
      q-input(
        v-model="item.explanation"
        placeholder="Input text with description, examples, etc."
        autogrow
        dense
        )
    q-footer
      q-btn-group(spread)
        q-btn(color="warning" :label="$t('back')" @click="drawersStore.setIsAddTermOpen(false)")
        q-btn(color="teal" :label="$t('save')" @click="addTerm" :disabled="!isInputsValid")
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import useUtils from 'src/composables/useUtils';
import { useVocabulary } from 'src/composables/useVocabulary';
import { usePhrasalVerbs } from 'src/composables/usePhrasalVerbs';

//Stores
import { useDrawersStore } from 'src/stores/drawersStore';
import { useLanguagesStore } from 'src/stores/languagesStore';
//
const drawersStore = useDrawersStore();
const languageStore = useLanguagesStore();
const { currentPageTitle } = useUtils();
const { addNewVocabularyTerm } = useVocabulary();
const { addNewPhrasalVerb } = usePhrasalVerbs();

const route = useRoute();

const item = ref({
  term: '',
  translation: '',
  explanation: '',
  training: true,
});

const isAddTermOpen = computed(() => {
  return drawersStore.isAddTermOpen;
});

const isInputsValid = computed(() => {
  return item.value.term.trim().length && item.value.translation.trim().length;
});

const addTerm = () => {
  if (!isInputsValid.value) return;
  if (route.path === '/words/vocabulary') {
    item.value.id = addNewVocabularyTerm({
      id: `${item.value.term}-${languageStore.currentLanguage}`,
      ...item.value,
    });
  } else if (route.path === '/phrasal-verbs') {
    item.value.id = addNewPhrasalVerb({
      id: `${item.value.term}-${languageStore.currentLanguage}`,
      ...item.value,
    });
  }
  item.value = {
    term: '',
    translation: '',
    explanation: '',
    training: true,
  };
};
</script>
