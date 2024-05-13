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
.text-h5 {{$t('correct answers')}}: {{ results.correctAnswers }}
.text-h5 {{$t('wrong answers')}}: {{ results.wrongAnswers }}
q-btn-group(spread flat).q-gutter-xl.q-pb-xl.absolute-bottom.q-px-md
  q-btn(color="warning" :label="$t('back')" @click="resetTraining()")
  q-btn(color="teal" :label="$t('try again')" @click="runPrestartingCountdown()")
</template>

<script setup>
defineProps({
  results: Object,
  resetTraining: Function,
  runPrestartingCountdown: Function,
});
</script>
