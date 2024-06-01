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
      q-toolbar-title.text-capitalize {{ $t('edit') }} {{ $t(currentPageTitle) }}
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
      .text-h6.text-dark.text-capitalize {{ $t('translation') }}
      q-input(v-model="item.translation" placeholder="Input translation" dense)
    q-card-section(dense)
      .text-h6.text-dark.text-capitalize {{ $t('explanation') }}
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
import { useTermsStore } from 'src/stores/termsStore';
//
const drawersStore = useDrawersStore();
const termsStore = useTermsStore();

//Composables
import useUtils from 'src/composables/useUtils';
import { useVocabulary } from 'src/composables/useVocabulary';
import { usePhrasalVerbs } from 'src/composables/usePhrasalVerbs';
import { useIrregularVerbs } from 'src/composables/useIrregularVerbs';
import { useSentences } from 'src/composables/useSentences';
//
const { currentPageTitle } = useUtils();
const { editWord, getWord } = useVocabulary();
const { editPhrasalVerb, getPhrasalVerb } = usePhrasalVerbs();
const { editIrregularVerb, getIrregularVerb } = useIrregularVerbs();
const { editSentence, getSentence } = useSentences();

const route = useRoute();
const router = useRouter();

const item = ref({
  term: '',
  translation: '',
  explanation: '',
  training: false,
});

const isEditTermOpen = computed(() => {
  return drawersStore.isEditTermOpen;
});

const isInputsValid = computed(() => {
  let termLength =
    route.path === '/irregular-verbs'
      ? !item.value.term.includes('')
      : item.value.term.trim().length;
  return termLength && item.value.translation.trim().length;
});

const editTerm = async () => {
  if (!isInputsValid.value) return;
  const data = {
    ...item.value,
    term:
      route.path === '/irregular-verbs'
        ? item.value.term.join(', ')
        : item.value.term,
  };
  const routeActions = {
    '/words/vocabulary': editWord,
    '/phrasal-verbs': editPhrasalVerb,
    '/irregular-verbs': editIrregularVerb,
    '/sentences': editSentence,
  };

  const editAction = routeActions[route.path];
  if (!editAction) return;

  await editAction(item.value.id, data, true);

  router.push({
    query: {
      term: (route.path === '/irregular-verbs'
        ? item.value.term
        : item.value.term.split(', ')
      )
        .join('-')
        .toLowerCase(),
    },
  });
};

const closePopup = () => {
  drawersStore.setIsEditTermOpen(false);
  router.push({ query: {} });
  termsStore.setCurrentTermId('');
};

onMounted(async () => {
  const termId = termsStore.currentTermId;
  if (route.path === '/words/vocabulary') {
    item.value = await getWord({ id: termId });
  } else if (route.path === '/phrasal-verbs') {
    item.value = await getPhrasalVerb({ id: termId });
  } else if (route.path === '/irregular-verbs') {
    item.value = await getIrregularVerb({ id: termId });
  } else if (route.path === '/sentences') {
    item.value = await getSentence({ id: termId });
  }
});
</script>
