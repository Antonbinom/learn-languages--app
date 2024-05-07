<template>
  <router-view />
</template>

<script setup>
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import { useLanguagesStore } from './stores/languagesStore';
//
const languageStore = useLanguagesStore();
const route = useRoute();

watch(
  () => route.path,
  () => {
    languageStore.searchValue = '';
  }
);

defineOptions({
  name: 'App',
});
</script>
