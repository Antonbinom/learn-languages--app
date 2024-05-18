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
    path: '/trainings/phrasal-verbs/sprint',
  },
  {
    name: 'spelling',
    path: '/trainings/phrasal-verbs/spelling',
  },
  {
    name: 'quiz',
    path: '/trainings/phrasal-verbs/quiz',
  },
  {
    name: 'repeat',
    path: '/trainings/phrasal-verbs/repeat',
  },
];
</script>
