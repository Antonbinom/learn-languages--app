<template lang="pug">
q-drawer(
  side="right"
  :model-value="isSettingsOpen"
  bordered
  )
  q-list
    q-item-label(header) Essential Links
  </template>

<script setup>
import { computed } from 'vue';
//Stores
import { useDrawersStore } from 'src/stores/drawersStore';
//
const drawersStore = useDrawersStore();

const isSettingsOpen = computed(() => {
  return drawersStore.isSettingsOpen;
});
</script>
