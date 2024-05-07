<template lang="pug">
q-input(
  v-model.trim="languagesStore.searchValue"
  debounce="500"
  placeholder="Search"
  )
  template(v-slot:append)
    q-icon(name="search")
</template>

<script setup>
//Stores
import { useLanguagesStore } from 'src/stores/languagesStore';
//
const languagesStore = useLanguagesStore();
</script>
