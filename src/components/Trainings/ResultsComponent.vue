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
.text-h5(v-if="!results.unknown") {{$t('correct answers')}}: {{ results.correctAnswers }}
.text-h5(v-if="!results.unknown") {{$t('wrong answers')}}: {{ results.wrongAnswers }}
div(v-if="results.unknown.length")
  .text-h5.q-mb-md {{ $t('unknown terms') }}
  q-chip(v-for="item in results.unknown" :key="item" color="primary" text-color="white") {{ item }}
q-btn-group(spread flat).q-gutter-xl.q-pb-xl.absolute-bottom.q-px-md
  q-btn(color="warning" :label="$t('back')" @click="toPreviousePage()")
  q-btn(color="teal" :label="$t('try again')" @click="tryAgain()")
</template>

<script setup>
import useAppEventBus from 'src/composables/useAppEventBus';
import useUtils from 'src/composables/useUtils';
const { $emit } = useAppEventBus();
const { toPreviousePage } = useUtils();
const props = defineProps({
  results: {
    correctAnswers: Number,
    wrongAnswers: Number,
    percents: Number,
  },
  resetTraining: Function,
});

const tryAgain = () => {
  props.resetTraining();
  $emit('run-prestarting-countdown');
};
</script>
