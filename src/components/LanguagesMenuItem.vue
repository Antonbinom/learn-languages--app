<template lang="pug">
q-btn(@click="setCurrentLanguage(language)" round dense flat class="q-mx-sm")
  q-avatar(size="42px")
    img(:src="`/images/${language}.svg`")
</template>

<script setup>
// Stores
import { useDrawersStore } from 'src/stores/drawersStore';
import { useLanguagesStore } from 'src/stores/languagesStore';
//
const drawersStore = useDrawersStore();
const languagesStore = useLanguagesStore();

defineProps({
  language: String,
});

const setCurrentLanguage = (language) => {
  languagesStore.setCurrentLanguage(language);
  drawersStore.setIsLangugesMenuOpen(false);
};
</script>
