<template lang="pug">
q-footer(elevated)
  q-tabs(
    v-model="tab"
    indicator-color="transparent"
    active-color="white"
    outside-arrows
    mobile-arrows
    class="text-grey-5 shadow-2")
    q-tab(
      v-for="tab in pages"
      :key="tab.name"
      :name="tab.name"
      :label="tab.label"
      @click="$router.push(tab.path)"
      )
</template>

<script setup>
import {pages} from '../data'
import { onMounted, ref } from 'vue';

import { useRoute } from 'vue-router';
const route = useRoute()

const tab = ref('words')

onMounted(() => {
  const currentTab = pages.find(item => item.path === route.path)
  tab.value = currentTab?.name
})
</script>

