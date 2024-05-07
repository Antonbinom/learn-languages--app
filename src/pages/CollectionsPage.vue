<template lang="pug">
q-page.items-center.justify-evenly
  ListComponent(
    :items="currentLanguageCollections")
</template>

<script setup>
import { computed } from 'vue';
//Components
import ListComponent from 'components/ListComponent.vue';
//Stores
import { useLanguagesStore } from 'src/stores/languagesStore';
//
const languagesStore = useLanguagesStore()

const currentLanguageCollections = computed(() => {
  return languagesStore.getCurrentLanguageWords()
})

</script>
