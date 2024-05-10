<template lang="pug">
q-page.q-px-md
  .q-py-md.q-gutter-sm.column
    router-link(to="/words")
      q-btn(color="white" text-color="dark" style="width: 100%") Words
    router-link(to="/phrasal-verbs")
      q-btn(color="white" text-color="dark" style="width: 100%") Phrasal Verbs
    router-link(to="/irregular-verbs")
      q-btn(color="white" text-color="dark" style="width: 100%") Irregular Verbs
</template>
