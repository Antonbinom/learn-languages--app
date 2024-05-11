<template lang="pug">
q-page.q-px-md
  .q-py-md.q-gutter-sm.column
    router-link(to="/words/vocabulary")
      q-btn(color="white" text-color="dark" style="width: 100%") {{$t('vocabulary')}}
    router-link(to="/words/sets")
      q-btn(color="white" text-color="dark" style="width: 100%") {{$t('words sets')}}
    router-link(to="/words/collections")
      q-btn(color="white" text-color="dark" style="width: 100%") {{$t('trainings')}}
</template>
