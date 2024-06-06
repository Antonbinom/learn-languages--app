<template lang="pug">
CoundownComponent(:countdown="countdown" :stopTraining="stopTraining")
.text-h5.text-bold.q-mb-lg {{ `${languageMode === 'english - russian' ? questionTerm?.term : questionTerm?.translation}` }}
HintComponent(:hint="languageMode === 'english - russian' ? questionTerm?.translation : questionTerm?.term")
q-btn-group(spread flat).q-gutter-xl.q-pb-xl.absolute-bottom.q-px-md
  q-btn(color="warning" :label="$t(`i don't know`)" @click="setAnswer(false)")
  q-btn(color="teal" :label="$t('i know')" @click="setAnswer(true)")
</template>

<script setup lang="ts">
// Components
import HintComponent from 'src/components/Trainings/HintComponent.vue';
import CoundownComponent from 'src/components/Trainings/CoundownComponent.vue';
// Composables
import useTrainingCountdown from 'src/composables/useTrainingCountdown';
// Types
import type { Term } from 'src/components/models';

interface Props {
  languageMode: string;
  questionTerm: Term;
  translationTerm?: Term;
  setAnswer: (value: string) => void;
}

const props = defineProps<Props>();
const emit = defineEmits(['onStopTraining']);

const { countdown, stopTraining } = useTrainingCountdown(props, emit);
</script>
