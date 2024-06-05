<template lang="pug">
q-knob(
  reverse
  :model-value="isTimeMode ? countdown : 6000"
  show-value
  readonly
  :min="0"
  :max="6000"
  size="150px"
  :thickness="0.05"
  :color="isTimeMode? 'teal' : 'warning'"
  :center-color="isTimeMode? 'white' : 'warning'"
  track-color="grey"
  :class="`q-my-xl ${isTimeMode ? '': 'cursor-pointer'}`"
  @click="!isTimeMode && stopTraining()"

  )
  span(v-if="isTimeMode") {{ Math.ceil(countdown/100) }}
  span.text-white.text-capitalize(v-if="!isTimeMode") {{ $t('stop') }}
</template>

<script setup>
defineProps({
  countdown: Number,
  isTimeMode: Boolean,
  stopTraining: Function,
});
</script>
