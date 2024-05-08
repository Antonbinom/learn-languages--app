<template lang="pug">
q-page
  .q-py-md.q-gutter-sm.column
    router-link(to="/words/vocabulary")
      q-btn(color="primary" style="width: 100%") {{$t('vocabulary')}}
    router-link(to="/words/sets")
      q-btn(color="primary" style="width: 100%") {{$t('words sets')}}
    router-link(to="/words/collections")
      q-btn(color="primary" style="width: 100%") {{$t('trainings')}}
</template>
