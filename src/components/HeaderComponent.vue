<template lang="pug">
q-header.bg-white(elevated)
  q-toolbar
    LanguageMenuButton(v-if="$route.path === '/'")
    PreviousePageButton(v-else)
    q-toolbar-title.text-center.text-capitalize.text-dark {{ currentPageTitle }}
    q-btn(
      flat
      @click="toggleSettingsMenu"
      round
      dense
      icon="menu"
      color="dark"
    )
</template>

<script setup>
import useUtils from 'src/composables/useUtils';
//Components
import LanguageMenuButton from 'src/components/LanguageMenuButton.vue';
import PreviousePageButton from 'src/components/PreviousePageButton.vue';
//Store
import { useDrawersStore } from 'src/stores/drawersStore';
//
const drawersStore = useDrawersStore();
const { currentPageTitle } = useUtils();

const toggleSettingsMenu = () => {
  drawersStore.setIsSettingsMenuOpen(!drawersStore.isSettingsOpen);
};
</script>
