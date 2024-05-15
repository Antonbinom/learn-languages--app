<template lang="pug">
q-page.q-px-md
  .q-py-md.q-gutter-sm.column
    router-link(v-for="link in links" :key="link.name" :to="link.path")
      q-btn(color="white" text-color="dark" style="width: 100%") {{$t(link.name)}}
</template>

<script setup>
const links = [
  {
    name: 'vocabulary',
    path: '/words/vocabulary',
  },
  {
    name: 'sets',
    path: '/words/sets',
  },
  {
    name: 'trainings',
    path: '/trainings/words',
  },
];
</script>
