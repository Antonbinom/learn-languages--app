<template lang="pug">
div {{ toggleValue }}
q-toggle(
  color="teal"
  :false-value="`${currentLanguage} - russian`"
  :true-value="`russian - ${currentLanguage}`"
  v-model="toggleValue"
  )
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits([]);
const props = defineProps({
  trainingMode: String,
  currentLanguage: String,
});

const toggleValue = ref(props.trainingMode);
emit('toggleTrainingMode', toggleValue.value);
</script>
