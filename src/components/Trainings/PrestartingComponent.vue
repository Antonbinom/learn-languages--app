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
  span {{ `${prestartingCountdown>0 ? prestartingCountdown : 'Start'}` }}
</template>

<script setup>
defineProps({
  prestartingCountdown: Number,
  runPrestartingCountdown: Function,
});
</script>
