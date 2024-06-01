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
  span.text-capitalize {{ `${prestartingCountdown > 0 ? prestartingCountdown : $t('start')}`}}
.full-width
  span Time mode {{timeModeValue? $t('ON'):  $t('OFF') }}
  q-toggle(
    color="teal"
    v-model="timeModeValue"
    @update:model-value="toggleTimeMode()"
    )
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['toggleTimeMode']);

const props = defineProps({
  resetTraining: Function,
  startTraining: Function,
  isTimeMode: Boolean,
  isCountdownRuns: Boolean,
});

const prestartingCountdown = ref(0);
const timeModeValue = ref(props.isTimeMode);

const toggleTimeMode = () => {
  emit('toggleTimeMode', timeModeValue.value);
};

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
</script>
