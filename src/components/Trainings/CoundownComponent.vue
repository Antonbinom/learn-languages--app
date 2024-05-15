<template lang="pug">
q-knob(
  reverse
  :model-value="countdown"
  show-value
  readonly
  :min="0"
  :max="6000"
  size="150px"
  :thickness="0.05"
  color="teal"
  center-color="white"
  track-color="grey"
  class="q-my-xl"
  )
  span {{ Math.ceil(countdown/100) }}
</template>

<script setup>
defineProps({
  countdown: Number,
});
</script>
