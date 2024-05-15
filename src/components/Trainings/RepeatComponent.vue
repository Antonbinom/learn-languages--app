<template lang="pug">
CoundownComponent(:countdown="countdown")
.text-h5.text-bold.q-mb-lg {{ `${trainingMode === 'english - russian' ? questionTerm?.term : questionTerm?.translation}` }}
HintComponent(:hint="trainingMode === 'english - russian' ? questionTerm?.translation : questionTerm?.term")
q-btn-group(spread flat).q-gutter-xl.q-pb-xl.absolute-bottom.q-px-md
  q-btn(color="warning" :label="$t(`i don't know`)" @click="setAnswer(false)")
  q-btn(color="teal" :label="$t('i know')" @click="setAnswer(true)")
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
// Components
import HintComponent from 'src/components/Trainings/HintComponent.vue';
import CoundownComponent from 'src/components/Trainings/CoundownComponent.vue';

defineProps({
  trainingMode: String,
  questionTerm: Object,
  setAnswer: Function,
});

const emit = defineEmits(['onStopTraining']);

const countdown = ref(6000);

let trainingCountdownInterval;

const runTrainingCountdown = () => {
  trainingCountdownInterval = setInterval(() => {
    if (countdown.value > 1) {
      countdown.value--;
    } else {
      clearInterval(trainingCountdownInterval);
      emit('onStopTraining');
    }
  }, 10);
};

onMounted(() => {
  runTrainingCountdown();
});

onUnmounted(() => {
  clearInterval(trainingCountdownInterval);
  emit('onStopTraining');
});
</script>
