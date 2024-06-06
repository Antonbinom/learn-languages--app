<template lang="pug">
q-page(:class="['q-px-md', 'text-center', bodyColor]")
  ButtonClose
  div(style="paddingTop: 60px")
    PrestartingComponent(
      v-if="isPresettings"
      :resetTraining="resetTraining"
      :startTraining="startTraining"
      :isCountdownRuns="isCountdownRuns"
      )
    LanguageTogglerComponent(
      v-if="isPresettings && !isCountdownRuns"
      :currentLanguage="currentLanguage"
      :trainingMode="trainingMode"
      @toggleTrainingMode="trainingMode = $event"
    )
    RepeatComponent(
      v-if="isTraining"
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
import RepeatComponent from 'src/components/Trainings/RepeatComponent.vue';
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

const setAnswer = (value) => {
  if (value) {
    status.value = 'correct';
    results.correctAnswers++;
  } else {
    status.value = 'wrong';
    results.wrongAnswers++;

    const unknownTermValue =
      trainingMode.value === 'english - russian'
        ? questionTerm.value?.term
        : questionTerm.value?.translation;

    results.unknown.push(unknownTermValue);
  }
  moveTermToPassedTerms();

  setTimeout(() => {
    if (!notPassedTerms.value.length) return stopTraining();
    status.value = 'neutral';
    setQuestionTerm();
  }, 200);
};
</script>
