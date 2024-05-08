<template lang="pug">
q-header(elevated)
  q-toolbar
    LanguageMenuButton(v-if="$route.path === '/'")
    PreviousePageButton(v-else)
    q-btn(flat @click="toggleSettingsMenu" round dense icon="menu")
</template>

<script setup>
//Components
import LanguageMenuButton from 'src/components/LanguageMenuButton.vue';
import PreviousePageButton from 'src/components/PreviousePageButton.vue';
//Store
import { useDrawersStore } from 'src/stores/drawersStore';
//
const drawersStore = useDrawersStore();
const toggleSettingsMenu = () => {
  drawersStore.setIsSettingsMenuOpen();
};
</script>
