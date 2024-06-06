<template lang="pug">
q-knob(
  :model-value="results.percents"
  show-value
  readonly
  :min="0"
  :max="100"
  size="150px"
  :thickness="0.05"
  :color="(results.percents < 25 && 'red')|| (results.percents < 50 && 'red-4') || (results.percents < 75 && 'warning') ||'teal'"
  center-color="white"
  track-color="grey"
  class="q-my-xl"
  )
  span {{ results.percents }}%
.text-h5(v-if="!results.unknown.length") {{$t('correct answers')}}: {{ results.correctAnswers }}
.text-h5(v-if="!results.unknown.length") {{$t('wrong answers')}}: {{ results.wrongAnswers }}
div(v-if="results.unknown?.length")
  .text-h5.q-mb-md {{ $t('unknown terms') }}
  q-chip(
    v-for="item in results.unknown"
  :key="item"
  color="primary"
  text-color="white"
  outline
  ) {{ item }}
q-btn-group(spread flat).q-gutter-xl.q-pb-xl.absolute-bottom.q-px-md
  q-btn(color="warning" :label="$t('back')" @click="$router.back()")
  q-btn(color="teal" :label="$t('try again')" @click="resetTraining()")
</template>

<script setup>
defineProps({
  results: {
    correctAnswers: Number,
    wrongAnswers: Number,
    percents: Number,
    unknown: {
      Type: Array,
    },
  },
  resetTraining: Function,
});
</script>
