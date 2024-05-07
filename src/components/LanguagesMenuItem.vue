<template lang="pug">
q-btn.q-mx-sm(
  @click="setCurrentLanguage(language)"
  round
  )
  q-avatar(size="42px")
    img(:src="languageImage(language)")
</template>

<script setup>
import useUtils from 'src/composables/useUtils.ts';
// Stores
import { useDrawersStore } from 'src/stores/drawersStore';
import { useLanguagesStore } from 'src/stores/languagesStore';
//
const drawersStore = useDrawersStore();
const languagesStore = useLanguagesStore();

defineProps({
  language: String,
});

const { languageImage } = useUtils();

const setCurrentLanguage = (language) => {
  languagesStore.setCurrentLanguage(language);
  drawersStore.setIsLangugesMenuOpen(false);
};
</script>
