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
    SpellingComponent(
      v-if="isTraining"
      :isTimeMode="isTimeMode"
      :trainingMode="trainingMode"
      :questionTerm="questionTerm"
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
import SpellingComponent from 'src/components/Trainings/SpellingComponent.vue';
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
} = useTraining();
//*
const setAnswer = (value) => {
  const isTermsEqual =
    (trainingMode.value === `${currentLanguage} - russian`
      ? questionTerm.value.translation
      : questionTerm.value.term) === value;
  if (isTermsEqual) {
    moveTermToPassedTerms();
    status.value = 'correct';
    results.correctAnswers++;
  } else {
    status.value = 'wrong';
    results.wrongAnswers++;
  }

  setTimeout(() => {
    if (!notPassedTerms.value.length) return stopTraining();
    status.value = 'neutral';
    setQuestionTerm();
  }, 200);
};
</script>
