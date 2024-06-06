<template lang="pug">
CoundownComponent(:countdown="countdown" :isTimeMode="isTimeMode" :stopTraining="stopTraining")
.text-h5.text-bold.q-mb-lg {{ `${languageMode === 'english - russian' ? questionTerm?.term : questionTerm?.translation}` }}
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
HintComponent(:hint="languageMode === 'english - russian' ? questionTerm?.translation : questionTerm?.term")
q-btn.fixed-bottom.q-mb-md(
  color="warning"
  :label="$t('next')"
  @click="setAnswer(inputs.join(''));"
)

</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted } from 'vue';
// Components
import CoundownComponent from 'src/components/Trainings/CoundownComponent.vue';
import HintComponent from 'src/components/Trainings/HintComponent.vue';
// Composables
import useTrainingCountdown from 'src/composables/useTrainingCountdown';
import { Term } from 'src/components/models';

interface Props {
  isTimeMode: boolean;
  languageMode: string;
  questionTerm: Term;
  translationTerm: Term;
  setAnswer: (value: string) => void;
}

const props = defineProps<Props>();
const emit = defineEmits(['onStopTraining']);

const { countdown, stopTraining } = useTrainingCountdown(props, emit);

const inputs = ref<string[]>([]);
const charInput = ref<(HTMLInputElement | null)[]>([]);

const inputLength = computed(() => {
  return (
    (props.languageMode !== 'english - russian'
      ? props.questionTerm?.term
      : props.questionTerm?.translation
    )?.length || 0
  );
});

const handleInput = (event: InputEvent, index: number) => {
  if (event.inputType === 'insertText') {
    if (index < inputLength.value - 1) {
      nextTick(() => {
        charInput.value[index + 1]?.focus();
      });
    }
  }
};

const handleBackspace = (event: KeyboardEvent, index: number) => {
  if (index > 0 && inputs.value[index] === '') {
    nextTick(() => {
      charInput.value[index - 1]?.focus();
    });
  }
};

watch(
  () => props.questionTerm,
  () => updateInputs()
);

const updateInputs = () => {
  inputs.value = new Array(inputLength.value).fill('');
  nextTick(() => {
    charInput.value[0]?.focus();
  });
};

onMounted(() => {
  updateInputs();
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
