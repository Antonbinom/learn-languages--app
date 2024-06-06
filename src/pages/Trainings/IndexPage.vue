<template lang="pug">
q-page.q-px-md
  .q-py-md.q-gutter-sm.column
    router-link(v-for="link in links" :key="link.name" :to="link.path")
      q-btn(color="white" text-color="dark" style="width: 100%") {{$t(link.name)}}
</template>

<script setup lang="ts">
const links = [
  {
    name: 'words',
    path: 'trainings/words',
  },
  {
    name: 'phrasal verbs',
    path: 'trainings/phrasal-verbs',
  },
  {
    name: 'irregular verbs',
    path: 'trainings/irregular-verbs',
  },
  {
    name: 'sentences',
    path: 'trainings/sentences',
  },
];
</script>
