<template lang="pug">
CoundownComponent(:countdown="countdown" :isTimeMode="isTimeMode" :stopTraining="stopTraining")
.text-h5.text-bold.q-mb-lg {{ `${languageMode === 'english - russian' ? questionTerm?.term : questionTerm?.translation}` }}
.text-h6 {{ `${languageMode !== 'english - russian' ? translationTerm?.term : translationTerm?.translation}` }}
q-btn-group(spread flat).q-gutter-xl.q-pb-xl.absolute-bottom.q-px-md
  q-btn(color="warning" :label="$t('no')" @click="setAnswer(false)")
  q-btn(color="teal" :label="$t('yes')" @click="setAnswer(true)")
</template>

<script setup lang="ts">
// Components
import CoundownComponent from 'src/components/Trainings/CoundownComponent.vue';
// Composables
import useTrainingCountdown from 'src/composables/useTrainingCountdown';
import type { Term } from 'src/components/models';

interface Props {
  languageMode: string;
  questionTerm: Term;
  translationTerm: Term;
  setAnswer: (value: string) => void;
  isTimeMode: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(['onStopTraining']);

const { countdown, stopTraining } = useTrainingCountdown(props, emit);
</script>
