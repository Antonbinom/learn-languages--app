<template lang="pug">
q-header(elevated)
  q-toolbar
    LanguageMenuButton(v-if="$route.path === '/'")
    PreviousePageButton(v-else)
    q-toolbar-title.text-center.text-capitalize {{ currentPageTitle }}
    q-btn(flat @click="toggleSettingsMenu" round dense icon="menu")
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
  drawersStore.setIsSettingsMenuOpen();
};
</script>
