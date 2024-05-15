<template lang="pug">
q-knob.cursor-pointer(
  :model-value="prestartingCountdown"
  show-value
  readonly
  size="150px"
  :thickness="0.02"
  color="teal"
  center-color="white"
  track-color="teal"
  class="q-my-xl"
  @click="!isCountdownRuns && runPrestartingCountdown()"
  )
  span {{ `${prestartingCountdown > 0 ? prestartingCountdown : 'Start'}`}}
</template>

<script setup>
import { ref } from 'vue';
import useAppEventBus from 'src/composables/useAppEventBus';
const { $on } = useAppEventBus();

const props = defineProps({
  resetTraining: Function,
  startTraining: Function,
  isCountdownRuns: Boolean,
});

const prestartingCountdown = ref(0);

const runPrestartingCountdown = () => {
  props.resetTraining();
  prestartingCountdown.value = 3;
  const countdownInterval = setInterval(() => {
    if (prestartingCountdown.value > 1) {
      prestartingCountdown.value--;
    } else {
      clearInterval(countdownInterval);
      props.startTraining();
    }
  }, 1000);
  prestartingCountdown.value = 3;
};
$on('run-prestarting-countdown', runPrestartingCountdown);
</script>
