<template lang="pug">
q-page.q-px-md
  .q-py-md.q-gutter-sm.column
    router-link(v-for="page in pages()" :key="page.name" :to="page.path")
      q-btn(color="white" text-color="dark" style="width: 100%") {{ $t(page.name) }}
</template>

<script setup>
import { pages } from '../data';
</script>
