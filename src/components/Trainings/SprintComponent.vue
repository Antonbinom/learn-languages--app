<template lang="pug">
CoundownComponent(:countdown="countdown" :isTimeMode="isTimeMode" :stopTraining="stopTraining")
.text-h5.text-bold.q-mb-lg {{ `${trainingMode === 'english - russian' ? questionTerm?.term : questionTerm?.translation}` }}
.text-h6 {{ `${trainingMode !== 'english - russian' ? translationTerm?.term : translationTerm?.translation}` }}
q-btn-group(spread flat).q-gutter-xl.q-pb-xl.absolute-bottom.q-px-md
  q-btn(color="warning" :label="$t('no')" @click="setAnswer(false)")
  q-btn(color="teal" :label="$t('yes')" @click="setAnswer(true)")
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
// Components
import CoundownComponent from 'src/components/Trainings/CoundownComponent.vue';

const props = defineProps({
  trainingMode: String,
  questionTerm: Object,
  translationTerm: Object,
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
  emit('onStopTraining');
});
</script>
