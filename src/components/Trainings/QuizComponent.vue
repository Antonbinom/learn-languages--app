<template lang="pug">
CoundownComponent(:countdown="countdown" :isTimeMode="isTimeMode" :stopTraining="stopTraining")
.text-h5.text-bold.q-mb-lg {{ `${trainingMode === 'english - russian' ? questionTerm?.term : questionTerm?.translation}` }}
HintComponent(:hint="trainingMode === 'english - russian' ? questionTerm?.translation : questionTerm?.term")
.q-pb-xl.absolute-bottom.q-px-md.q-gutter-md
  q-btn(
    v-for="answer in answerTerms"
    :key="answer.id"
    color="warning"
    style="width: 45%"
    :label="`${trainingMode === 'english - russian' ? answer?.translation : answer?.term}`"
    @click="setAnswer(answer)"
  )
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
//Components
import CoundownComponent from 'src/components/Trainings/CoundownComponent.vue';
import HintComponent from 'src/components/Trainings/HintComponent.vue';

const props = defineProps({
  trainingMode: String,
  questionTerm: Object,
  answerTerms: Array,
  setAnswer: Function,
  isTimeMode: Boolean,
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

const stopTraining = () => {
  emit('onStopTraining');
};

onMounted(() => {
  props.isTimeMode && runTrainingCountdown();
});

onUnmounted(() => {
  props.isTimeMode && clearInterval(trainingCountdownInterval);
  clearInterval(trainingCountdownInterval);
  emit('onStopTraining');
});
</script>
