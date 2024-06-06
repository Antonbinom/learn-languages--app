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
  @click="runPrestartingCountdown()"
  )
  span.text-capitalize {{ `${prestartingCountdown > 0 ? prestartingCountdown : $t('start')}`}}

.full-width(v-if="$route.path !== '/trainings/words/repeat'")
  span Time mode {{timeModeValue? $t('ON'):  $t('OFF') }}
  q-toggle(
    color="teal"
    v-model="timeModeValue"
    @update:model-value="toggleTimeMode()"
    :disable="isCountdownRuns"
    )
.full-width
  span.text-capitalize {{ languageModeValue }}
  q-toggle(
  color="teal"
  :false-value="`${currentLanguage} - russian`"
  :true-value="`russian - ${currentLanguage}`"
  v-model="languageModeValue"
  @update:model-value="toggleLanguageMode()"
  :disable="isCountdownRuns"
  )
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['toggleTimeMode', 'toggleLanguageMode']);

const props = defineProps({
  resetTraining: Function,
  startTraining: Function,
  isTimeMode: Boolean,
  languageMode: String,
  currentLanguage: String,
});

const prestartingCountdown = ref(0);
const isCountdownRuns = ref(false);
const timeModeValue = ref(props.isTimeMode);
const languageModeValue = ref(props.languageMode);

const toggleTimeMode = () => {
  emit('toggleTimeMode', timeModeValue.value);
};

const toggleLanguageMode = () => {
  emit('toggleLanguageMode', languageModeValue.value);
};

const runPrestartingCountdown = () => {
  if (isCountdownRuns.value) return;
  if (!timeModeValue.value) return props.startTraining();

  isCountdownRuns.value = true;
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
