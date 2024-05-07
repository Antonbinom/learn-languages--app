<template lang="pug">
q-item(
  @click="addLanguage(language)"
  clickable
  v-ripple
  )
  q-item-section(avatar)
    q-avatar
      img(:src="languageImage(language)")
  q-item-section {{ $t(language) }}
</template>

<script setup>
import useUtils from 'src/composables/useUtils.ts';
import { useVocabulary } from 'src/composables/useVocabulary';
// Stores
import { useDrawersStore } from 'src/stores/drawersStore';
import { useLanguagesStore } from 'src/stores/languagesStore';
//
const { createVocabulary } = useVocabulary();
const drawersStore = useDrawersStore();
const languagesStore = useLanguagesStore();

const { languageImage } = useUtils();

defineProps({
  language: Object,
});

const addLanguage = async (language) => {
  await createVocabulary();
  languagesStore.setSelectedLanguages(language);
  if (!languagesStore.notSelectedLanguages.length) {
    drawersStore.setIsAddLanguageMenuOpen(false);
  }
};
</script>
