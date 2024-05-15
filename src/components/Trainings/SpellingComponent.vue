<template lang="pug">
CoundownComponent(:countdown="countdown")
.text-h5.text-bold.q-mb-lg {{ `${trainingMode === 'english - russian' ? questionTerm?.term : questionTerm?.translation}` }}
.character-inputs(v-if="inputLength")
  //- props: inputs, inputLengthб setAnswer
  //- handleInput: inputLength, charInput
  //- handleBackspace:
  //- setAnswer

  input(v-for="(char, index) in inputs"
    :key="index"
    v-model="inputs[index]"
    @input="handleInput($event, index)"
    @keydown.backspace="handleBackspace($event, index)"
    @keydown.enter="setAnswer(inputs.join(''));"
    ref="charInput"
    maxlength="1"
    class="character-input")
HintComponent(:hint="trainingMode === 'english - russian' ? questionTerm?.translation : questionTerm?.term")
q-btn.fixed-bottom.q-mb-md(
  color="warning"
  :label="$t('next')"
  @click="setAnswer(inputs.join(''));"
)

</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue';
// Components
import CoundownComponent from 'src/components/Trainings/CoundownComponent.vue';
import HintComponent from 'src/components/Trainings/HintComponent.vue';
const props = defineProps({
  trainingMode: String,
  questionTerm: Object,
  setAnswer: Function,
});

const emit = defineEmits(['onStopTraining']);

const inputs = ref();
const charInput = ref([]);
const countdown = ref(6000);
const inputLength = computed(() => {
  return (
    props.trainingMode !== 'english - russian'
      ? props.questionTerm?.term
      : props.questionTerm?.translation
  )?.length;
});

const handleInput = (event, index) => {
  if (event.inputType === 'insertText') {
    if (index < inputLength.value - 1) {
      nextTick(() => {
        charInput.value[index + 1].focus();
      });
    }
  }
};

const handleBackspace = (event, index) => {
  if (index > 0 && inputs.value[index] === '') {
    nextTick(() => {
      charInput.value[index - 1].focus();
    });
  }
};

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

watch(
  () => props.questionTerm,
  () => updateInputs()
);

const updateInputs = () => {
  inputs.value = new Array(inputLength.value).fill('');
  nextTick(() => {
    charInput.value[0].focus();
  });
};

onMounted(() => {
  runTrainingCountdown();
  updateInputs();
});

onUnmounted(() => {
  clearInterval(trainingCountdownInterval);
  emit('onStopTraining');
});
</script>

<style scoped>
.character-inputs {
  padding-block: 16px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
}

.character-input {
  width: 40px;
  height: 40px;
  text-align: center;
  font-size: 24px;
}
</style>
