<template lang="pug">
q-page
  .q-py-md.q-gutter-sm.column
    router-link(to="/words")
      q-btn(color="primary" style="width: 100%") Words
    router-link(to="/phrasal-verbs")
      q-btn(color="primary" style="width: 100%") Phrasal Verbs
    router-link(to="/irregular-verbs")
      q-btn(color="primary" style="width: 100%") Irregular Verbs
</template>
