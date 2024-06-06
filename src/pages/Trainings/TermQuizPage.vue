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
    QuizComponent(
      v-if="isTraining"
      :isTimeMode="isTimeMode"
      :languageMode="languageMode"
      :questionTerm="questionTerm"
      :answerTerms="answerTerms"
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
import QuizComponent from 'src/components/Trainings/QuizComponent.vue';
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
  answerTerms,
  setAnswerTerms,
} = useTraining();

// Types
import type { Term } from 'src/components/models';

const setAnswer = (value: Term) => {
  const isTermsEqual =
    languageMode.value === `${currentLanguage} - russian`
      ? questionTerm.value?.translation === value.translation
      : questionTerm.value?.term === value.term;
  if (isTermsEqual) {
    moveTermToPassedTerms();
    status.value = 'correct';
    results.correctAnswers++;
  } else {
    status.value = 'wrong';
    results.wrongAnswers++;
  }

  setTimeout(() => {
    if (!notPassedTerms.value.length) {
      stopTraining();
    } else {
      status.value = 'neutral';
      setQuestionTerm();
      setAnswerTerms();
    }
  }, 200);
};
</script>
