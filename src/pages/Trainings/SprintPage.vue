<template lang="pug">
q-page(:class="['q-px-md', 'text-center', bodyColor]")
  ButtonClose
  div(style="paddingTop: 60px")
    PrestartingComponent(
      v-if="isPresettings"
      :resetTraining="resetTraining"
      :startTraining="startTraining"
      :isCountdownRuns="isCountdownRuns"
      @toggleTimeMode="isTimeMode = $event"
      :isTimeMode="isTimeMode"
      )
    LanguageTogglerComponent(
      v-if="isPresettings && !isCountdownRuns"
      :currentLanguage="currentLanguage"
      :trainingMode="trainingMode"
      @toggleTrainingMode="trainingMode = $event"
    )
    SprintComponent(
      v-if="isTraining"
      :isTimeMode="isTimeMode"
      :trainingMode="trainingMode"
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

<script setup>
//Components
import PrestartingComponent from 'src/components/Trainings/PrestartingComponent.vue';
import LanguageTogglerComponent from 'src/components/Trainings/LanguageTogglerComponent.vue';
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
  isCountdownRuns,
  status,
  trainingMode,
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

const setAnswer = (value) => {
  const isTermsEqual = questionTerm.value.term === translationTerm.value.term;
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
