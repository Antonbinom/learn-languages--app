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
    SpellingComponent(
      v-if="isTraining"
      :isTimeMode="isTimeMode"
      :languageMode="languageMode"
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

<script setup lang="ts">
//Components
import PrestartingComponent from 'src/components/Trainings/PrestartingComponent.vue';
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
} = useTraining();
//*
const setAnswer = (value: string) => {
  const isTermsEqual =
    (languageMode.value === `${currentLanguage} - russian`
      ? questionTerm.value?.translation
      : questionTerm.value?.term) === value;
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
