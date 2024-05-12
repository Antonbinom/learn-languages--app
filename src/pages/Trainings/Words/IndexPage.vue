<template lang="pug">
q-page.q-px-md
  .q-py-md.q-gutter-sm.column
    router-link(v-for="link in links" :key="link.name" :to="link.path")
      q-btn(color="white" text-color="dark" style="width: 100%") {{$t(link.name)}}
</template>

<script setup>
const links = [
  {
    name: 'sprint',
    path: '/trainings/words/sprint',
  },
  {
    name: 'spelling',
    path: '/trainings/words/spelling',
  },
  {
    name: 'term-translation',
    path: '/trainings/words/repeat',
  },
  {
    name: 'repeat',
    path: '/trainings/words/repeat',
  },
];
</script>
