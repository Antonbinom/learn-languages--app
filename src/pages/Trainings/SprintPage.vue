<template lang="pug">
q-page(:class="['q-px-md', 'text-center', bodyColor]")
  ButtonClose
  div(style="paddingTop: 60px")
    PrestartingComponent(
      v-if="isPresettings"
      :resetTraining="resetTraining"
      :startTraining="startTraining"
      :currentLanguage="currentLanguage"
      :languageMode="languageMode"
      :isTimeMode="isTimeMode"
      @toggleTimeMode="isTimeMode = $event"
      @toggleLanguageMode="languageMode = $event"
      )
    SprintComponent(
      v-if="isTraining"
      :isTimeMode="isTimeMode"
      :languageMode="languageMode"
      :questionTerm="questionTerm"
      :translationTerm="translationTerm"
      :setAnswer="setAnswer"
      @onStopTraining="stopTraining"
      )
    ResultsComponent(
      v-if="isResults"
      :results="results"
      :resetTraining="resetTraining"
    )
</template>

<script setup lang="ts">
//Components
import PrestartingComponent from 'src/components/Trainings/PrestartingComponent.vue';
import SprintComponent from 'src/components/Trainings/SprintComponent.vue';
import ResultsComponent from 'src/components/Trainings/ResultsComponent.vue';
import ButtonClose from 'src/components/Trainings/ButtonClose.vue';

// Composables
import useTraining from 'src/composables/useTraining';
//
const {
  isPresettings,
  isTraining,
  isResults,
  status,
  languageMode,
  isTimeMode,
  notPassedTerms,
  questionTerm,
  results,
  bodyColor,
  startTraining,
  stopTraining,
  resetTraining,
  setQuestionTerm,
  currentLanguage,
  moveTermToPassedTerms,
  translationTerm,
  setTranslationTerm,
} = useTraining();

const setAnswer = (value: boolean) => {
  const isTermsEqual = questionTerm.value?.term === translationTerm.value?.term;
  if (isTermsEqual && value) {
    moveTermToPassedTerms();
    status.value = 'correct';
    results.correctAnswers++;
  } else if (!isTermsEqual && !value) {
    status.value = 'correct';
    results.correctAnswers++;
  } else if (isTermsEqual && !value) {
    status.value = 'wrong';
    results.wrongAnswers++;
  } else {
    status.value = 'wrong';
    results.wrongAnswers++;
  }

  setTimeout(() => {
    if (!notPassedTerms.value.length) return stopTraining();
    status.value = 'neutral';
    setQuestionTerm();
    setTranslationTerm();
  }, 200);
};
</script>
