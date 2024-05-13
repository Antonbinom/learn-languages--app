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
.text-h5.text-bold.q-mb-lg {{ `${trainingMode === 'English - Russian' ? questionTerm?.term : questionTerm?.translation}` }}
.text-h6 {{ `${trainingMode !== 'English - Russian' ? translationTerm?.term : translationTerm?.translation}` }}
q-btn-group(spread flat).q-gutter-xl.q-pb-xl.absolute-bottom.q-px-md
  q-btn(color="warning" :label="$t('no')" @click="setAnswer(false)")
  q-btn(color="teal" :label="$t('yes')" @click="setAnswer(true)")
</template>

<script setup>
defineProps({
  countdown: Number,
  trainingMode: String,
  questionTerm: Object,
  translationTerm: Object,
  setAnswer: Function,
});
</script>
