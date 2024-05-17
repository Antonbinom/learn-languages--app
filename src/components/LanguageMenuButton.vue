<template lang="pug">
q-btn(@click="openLanguagesMenu" round dense flat)
  q-avatar
    img(:src="`/images/${languagesStore?.currentLanguage}.svg`")
q-toolbar-title.text-capitalize.text-dark {{ $t(languagesStore?.currentLanguage) }}
</template>

<script setup>
//Store
import { useDrawersStore } from 'src/stores/drawersStore';
import { useLanguagesStore } from 'src/stores/languagesStore';
//
const drawersStore = useDrawersStore();
const languagesStore = useLanguagesStore();

const openLanguagesMenu = () => {
  drawersStore.setIsLangugesMenuOpen(true);
};
</script>
