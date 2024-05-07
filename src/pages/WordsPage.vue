<template lang="pug">
q-page.items-center.justify-evenly
  .q-py-md.q-gutter-sm.column
    router-link(to="/words/vocabulary")
      q-btn(color="primary" style="width: 100%") Vocabulary
    router-link(to="/words/collections")
      q-btn(color="primary" style="width: 100%") Collections
    router-link(to="/words/collections")
      q-btn(color="primary" style="width: 100%") Trainings
</template>
