<template lang="pug">
q-header(elevated)
  q-toolbar
    q-btn(flat @click="openLanguagesMenu" round dense )
      q-avatar
        img(:src="languageImage(languagesStore?.currentLanguage)")
    q-toolbar-title.text-capitalize {{ languagesStore.currentLanguage }}
    q-btn(flat @click="toggleSettingsMenu" round dense icon="menu")
</template>

<script  setup>
import useUtils from 'src/composables/useUtils.ts'
//Store
import { useDrawersStore } from 'src/stores/drawersStore';
import { useLanguagesStore } from 'src/stores/languagesStore';
//
const drawersStore = useDrawersStore();
const languagesStore = useLanguagesStore()

const toggleSettingsMenu = () => {
  drawersStore.setIsSettingsMenuOpen();
};
const openLanguagesMenu = () => {
  drawersStore.setIsLangugesMenuOpen(true);
};
const {languageImage} = useUtils()

</script>
