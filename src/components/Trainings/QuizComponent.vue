<template lang="pug">
CoundownComponent(:countdown="countdown" :isTimeMode="isTimeMode" :stopTraining="stopTraining")
.text-h5.text-bold.q-mb-lg {{ `${languageMode === 'english - russian' ? questionTerm?.term : questionTerm?.translation}` }}
HintComponent(:hint="languageMode === 'english - russian' ? questionTerm?.translation : questionTerm?.term")
.q-pb-xl.absolute-bottom.q-px-md.q-gutter-md
  q-btn(
    v-for="answer in answerTerms"
    :key="answer.id"
    color="warning"
    style="width: 45%"
    :label="`${languageMode === 'english - russian' ? answer?.translation : answer?.term}`"
    @click="setAnswer(answer)"
  )
</template>

<script setup lang="ts">
//Components
import CoundownComponent from 'src/components/Trainings/CoundownComponent.vue';
import HintComponent from 'src/components/Trainings/HintComponent.vue';
// Composables
import useTrainingCountdown from 'src/composables/useTrainingCountdown';
import type { Term } from 'src/components/models';

interface Props {
  isTimeMode: boolean;
  languageMode: string;
  questionTerm: Term;
  answerTerms: Term[];
  setAnswer: (value: string) => void;
}

const props = defineProps<Props>();
const emit = defineEmits(['onStopTraining']);

const { countdown, stopTraining } = useTrainingCountdown(props, emit);
</script>
