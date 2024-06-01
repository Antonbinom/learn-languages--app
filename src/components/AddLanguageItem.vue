<template lang="pug">
q-item(
  @click="addLanguage(language)"
  clickable
  v-ripple
  )
  q-item-section(avatar)
    q-avatar
      img(:src="`/images/${language}.svg`")
  q-item-section.text-capitalize {{ $t(language) }}
</template>

<script setup>
// Stores
import { useDrawersStore } from 'src/stores/drawersStore';
import { useLanguagesStore } from 'src/stores/languagesStore';
//
const drawersStore = useDrawersStore();
const languagesStore = useLanguagesStore();

defineProps({
  language: Object,
});

const addLanguage = async (language) => {
  languagesStore.setSelectedLanguages(language);
  if (!languagesStore.notSelectedLanguages.length) {
    drawersStore.setIsAddLanguageMenuOpen(false);
  }
};
</script>
