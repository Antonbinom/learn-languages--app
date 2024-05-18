<template>
  <router-view />
</template>

<script setup>
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import { useLanguagesStore } from './stores/languagesStore';
//
const languagesStore = useLanguagesStore();
const route = useRoute();

watch(
  () => route.path,
  () => {
    languagesStore.searchValue = '';
  }
);

defineOptions({
  name: 'App',
});
</script>
