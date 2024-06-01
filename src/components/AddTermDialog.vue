<template lang="pug">
q-dialog(
  maximized
  persistent
  transition-show="slide-up"
  transition-hide="slide-down"
  :model-value="isAddTermOpen"
  )
  q-card(class="bg-white text-white")
    q-toolbar(class="text-dark text-center")
      q-toolbar-title.text-capitalize {{ $t('add') }} {{ $t(currentPageTitle) }}
    q-card-section(v-if="route.path === '/irregular-verbs'" dense)
      .text-h6.text-dark.text-capitalize {{ $t('terms') }}
      .row.no-wrap.q-gutter-sm.q-mt-sm
        q-input(
          v-for="(input, index) in item.term"
          :key="index"
          v-model="item.term[index]"
          :placeholder="$t('put value')"
          dense
          outlined
          style="width: 100%"
          )
    q-card-section(v-else dense)
      .text-h6.text-dark.text-capitalize {{ $t('term') }}
      q-input(
        v-model="item.term"
        :placeholder="$t('put value')"
        dense
        )
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

//Stores
import { useDrawersStore } from 'src/stores/drawersStore';
//
const drawersStore = useDrawersStore();

// Composables
import useUtils from 'src/composables/useUtils';
import { useVocabulary } from 'src/composables/useVocabulary';
import { usePhrasalVerbs } from 'src/composables/usePhrasalVerbs';
import { useIrregularVerbs } from 'src/composables/useIrregularVerbs';
import { useSentences } from 'src/composables/useSentences';
//
const { currentPageTitle, generateId } = useUtils();
const { addNewVocabularyTerm } = useVocabulary();
const { addNewPhrasalVerb } = usePhrasalVerbs();
const { addNewIrregularVerb } = useIrregularVerbs();
const { addNewSentence } = useSentences();

const route = useRoute();

const item = ref({
  term: route.path === '/irregular-verbs' ? ['', '', ''] : '',
  translation: '',
  explanation: '',
  training: true,
});

const isAddTermOpen = computed(() => {
  return drawersStore.isAddTermOpen;
});

const isInputsValid = computed(() => {
  let termLength =
    route.path === '/irregular-verbs'
      ? item.value.term.every((t) => t.trim().length > 0)
      : item.value.term.trim().length;
  return termLength && item.value.translation.trim().length;
});

const addTerm = async () => {
  if (!isInputsValid.value) return;
  const data = {
    id: generateId(),
    ...item.value,
    term:
      route.path === '/irregular-verbs'
        ? item.value.term.join(', ')
        : item.value.term,
  };

  const routeActions = {
    '/words/vocabulary': addNewVocabularyTerm,
    '/phrasal-verbs': addNewPhrasalVerb,
    '/irregular-verbs': addNewIrregularVerb,
    '/sentences': addNewSentence,
  };

  const createAction = routeActions[route.path];
  await createAction(data);

  item.value = {
    term: route.path === '/irregular-verbs' ? ['', '', ''] : '',
    translation: '',
    explanation: '',
    training: true,
  };
};
</script>
