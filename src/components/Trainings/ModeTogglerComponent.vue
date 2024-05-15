<template lang="pug">
div {{ toggleValue }}
q-toggle(
  color="teal"
  :false-value="`${currentLanguage} - russian`"
  :true-value="`russian - ${currentLanguage}`"
  v-model="toggleValue"
  @update:model-value="toggleTrainMode()"
  )
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['toggleTrainingMode']);
const props = defineProps({
  trainingMode: String,
  currentLanguage: String,
});

const toggleValue = ref(props.trainingMode);
const toggleTrainMode = () => {
  emit('toggleTrainingMode', toggleValue.value);
};
</script>
