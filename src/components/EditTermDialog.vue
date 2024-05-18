<template lang="pug">
q-dialog(
  maximized
  persistent
  transition-show="slide-up"
  transition-hide="slide-down"
  :model-value="isEditTermOpen"
  )
  q-card(class="bg-white text-white")
    q-toolbar(class="text-dark text-center")
      q-toolbar-title Edit {{ $t(currentPageTitle) }}
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
        q-btn(color="warning" :label="$t('back')" @click="closePopup")
        q-btn(color="teal" :label="$t('edit term')"  @click="editTerm" :disabled="!isInputsValid")
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

//Stores
import { useDrawersStore } from 'src/stores/drawersStore';
import { useLanguagesStore } from 'src/stores/languagesStore';
//
const drawersStore = useDrawersStore();
const languagesStore = useLanguagesStore();

//Composables
import useUtils from 'src/composables/useUtils';
import { useVocabulary } from 'src/composables/useVocabulary';
import { usePhrasalVerbs } from 'src/composables/usePhrasalVerbs';
import { useIrregularVerbs } from 'src/composables/useIrregularVerbs';
//
const { currentPageTitle } = useUtils();
const { editVocabularyTerm, getVocabularyTerm } = useVocabulary();
const { editPhrasalVerb, getPhrasalVerb } = usePhrasalVerbs();
const { editIrregularVerb, getIrregularVerb } = useIrregularVerbs();

const route = useRoute();
const router = useRouter();

const item = ref({
  id: '',
  term: '',
  translation: '',
  explanation: '',
  training: false,
});

const isEditTermOpen = computed(() => {
  return drawersStore.isEditTermOpen;
});

const isInputsValid = computed(() => {
  return (
    item.value?.term?.trim().length && item.value.translation?.trim().length
  );
});

const editTerm = () => {
  if (!isInputsValid.value) return;
  const data = {
    ...item.value,
    id: `${item.value.term.split(', ').join('-')}-${
      languagesStore.currentLanguage
    }`,
  };
  const routeActions = {
    '/words/vocabulary': editVocabularyTerm,
    '/phrasal-verbs': editPhrasalVerb,
    '/irregular-verbs': editIrregularVerb,
  };

  const editAction = routeActions[route.path];
  if (editAction) editAction(item.value.id, data);
};

const closePopup = () => {
  drawersStore.setIsEditTermOpen(false);
  router.push({ query: {} });
};

onMounted(async () => {
  if (route.path === '/words/vocabulary') {
    item.value = await getVocabularyTerm(route.query.term);
  } else if (route.path === '/phrasal-verbs') {
    item.value = await getPhrasalVerb(route.query.term);
  } else if (route.path === '/irregular-verbs') {
    item.value = await getIrregularVerb(route.query.term);
  }
});
</script>
