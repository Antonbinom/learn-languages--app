<template lang="pug">
q-dialog(position="top" :model-value="isLangugesMenuOpen" @hide="drawersStore.setIsLangugesMenuOpen(false)")
  q-card(:style="{'width': languages.length * 58 + 74 + 'px', 'max-width': '300px'}")
    q-scroll-area(style="height: 60px; max-width: 300px;")
      .row.no-wrap.q-pa-sm
        LanguagesMenuItem(
        v-for="language in languages"
        :key="language"
        :language="language"
        )
        q-btn.q-mx-sm(push color="primary" round icon="add" @click="languagesStore.notSelectedLanguages.length && drawersStore.setIsAddLanguageMenuOpen(true)")
q-dialog(:model-value="isAddLanguageMenuOpen" persistent transition-show="scale" transition-hide="scale" @hide="drawersStore.setIsAddLanguageMenuOpen(false)")
  q-card(style="width:100%")
    q-scroll-area(:style="{'height': notSelectedLanguages.length * 58 + 16 + 'px', maxWidth: 300,}")
      .q-pa-sm
        AddLanguageItem(v-for="language in notSelectedLanguages" :key="language" :language="language")
    q-card-actions.bg-white.text-teal(align="right")
      q-btn(flat label="OK" v-close-popup)
</template>

<script setup>
import { computed } from 'vue';
//Components
import LanguagesMenuItem from 'src/components/LanguagesMenuItem.vue';
import AddLanguageItem from 'src/components/AddLanguageItem.vue';
//Stores
import { useDrawersStore } from 'src/stores/drawersStore';
import { useLanguagesStore } from 'src/stores/languagesStore';
//
const drawersStore = useDrawersStore();
const languagesStore = useLanguagesStore();

const languages = computed(() => {
  return languagesStore.selectedLanguages;
});
const notSelectedLanguages = computed(() => {
  return languagesStore.notSelectedLanguages;
});
const isLangugesMenuOpen = computed(() => {
  return drawersStore.isLangugesMenuOpen;
});

const isAddLanguageMenuOpen = computed(() => {
  return drawersStore.isAddLanguageMenuOpen;
});
</script>
