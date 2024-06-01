<template>
  <router-view />
</template>

<script setup>
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
//Composables
import { useIrregularVerbs } from './composables/useIrregularVerbs';
import { usePhrasalVerbs } from './composables/usePhrasalVerbs';
//
const { seedIrregularVerbs } = useIrregularVerbs();
const { seedPhrasalVerbs } = usePhrasalVerbs();

//Stores
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

onMounted(() => {
  seedIrregularVerbs();
  seedPhrasalVerbs();
});
</script>
