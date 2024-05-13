<template lang="pug">
q-page(:class="['q-px-md', 'text-center', bodyColor]")
  q-btn(
    round
    outline
    dense
    color="teal"
    label="x"
    @click="toPreviousePage"
    class="absolute-top-right q-ma-md"
    )
  div(style="paddingTop: 60px")
    PrestartingComponent(
      v-if="isPresettings"
      :prestartingCountdown="prestartingCountdown"
      :runPrestartingCountdown="runPrestartingCountdown"
      )
    ModeTogglerComponent(
      v-if="isPresettings && !isCountdownRuns"
      :currentLanguage="currentLanguage"
      :trainingMode="trainingMode"
      @toggleTrainingMode="trainingMode = $event"
    )
    SprintComponent(
      v-if="isTraining"
      :countdown="countdown"
      :trainingMode="trainingMode"
      :questionTerm="questionTerm"
      :translationTerm="translationTerm"
      :setAnswer="setAnswer")
    ResultsComponent(
      v-if="isResults"
      :results="results"
      :resetTraining="resetTraining"
      :runPrestartingCountdown="runPrestartingCountdown"
    )
</template>

<script setup>
import { computed, onMounted, ref, reactive } from 'vue';
//Components
import PrestartingComponent from 'src/components/Trainings/PrestartingComponent.vue';
import ModeTogglerComponent from 'src/components/Trainings/ModeTogglerComponent.vue';
import SprintComponent from 'src/components/Trainings/SprintComponent.vue';
import ResultsComponent from 'src/components/Trainings/ResultsComponent.vue';

import { useVocabulary } from 'src/composables/useVocabulary';
import useUtils from 'src/composables/useUtils';
//Stores
import { useLanguagesStore } from 'src/stores/languagesStore';
//
const { currentLanguage } = useLanguagesStore();

const { getVocabulary } = useVocabulary();
const { toPreviousePage } = useUtils();

const isPresettings = ref(true);
const isTraining = ref(false);
const isResults = ref(false);
const isCountdownRuns = ref(false);
const status = ref('neutral');

const countdown = ref(6000);
const prestartingCountdown = ref(0);
const trainingMode = ref(`${currentLanguage} - russian`);

const terms = ref([]);
const passedTerms = ref([]);
const notPassedTerms = ref([]);
const questionTerm = ref({});
const translationTerm = ref({});
const results = reactive({
  correctAnswers: 0,
  wrongAnswers: 0,
  percents: 0,
});

const bodyColor = computed(() => {
  if (status.value === 'correct') return 'bg-green-2';
  else if (status.value === 'wrong') return 'bg-red-2';
  else return '';
});

const moveTermToPassedTerms = () => {
  const passedTermIndex = notPassedTerms.value.findIndex(
    (item) => item.id === questionTerm.value.id
  );
  passedTerms.value.push(notPassedTerms.value[passedTermIndex]);
  notPassedTerms.value.splice(passedTermIndex, 1);
};

const setQuestionTerm = () => {
  const randomIndex = Math.floor(Math.random() * notPassedTerms.value.length);
  questionTerm.value = notPassedTerms.value[randomIndex];
};

const setTranslationTerm = () => {
  const filteredTerms = terms.value.filter(
    (item) => item.id !== questionTerm.value.id
  );
  const randomIndex = Math.floor(Math.random() * filteredTerms.length);
  const randomTranslationsIndex = Math.random() >= 0.5 ? 1 : 0;

  translationTerm.value = [questionTerm.value, terms.value[randomIndex]][
    randomTranslationsIndex
  ];
};

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
    if (!notPassedTerms.value.length) {
      stopTraining();
    } else {
      status.value = 'neutral';
      setQuestionTerm();
      setTranslationTerm();
    }
  }, 200);
};

function startTraining() {
  isPresettings.value = false;
  isTraining.value = true;
  isResults.value = false;
}

function stopTraining() {
  isCountdownRuns.value = false;
  isTraining.value = false;
  isResults.value = true;
  status.value = 'neutral';

  clearInterval(trainingCountdownInterval);

  const totalQuestions = results.correctAnswers + results.wrongAnswers;

  if (totalQuestions) {
    results.percents =
      ((results.correctAnswers / totalQuestions) * 100).toFixed(0) || 0;
  }
}

function resetTraining() {
  isCountdownRuns.value = false;
  isPresettings.value = true;
  isTraining.value = false;
  isResults.value = false;
  countdown.value = 6000;
  notPassedTerms.value = JSON.parse(JSON.stringify(terms.value));
  passedTerms.value = [];
  results.correctAnswers = 0;
  results.wrongAnswers = 0;
  results.percents = 0;
  prestartingCountdown.value = 0;
}

const runPrestartingCountdown = () => {
  resetTraining();
  isCountdownRuns.value = true;
  prestartingCountdown.value = 3;
  const countdownInterval = setInterval(() => {
    if (prestartingCountdown.value > 1) {
      prestartingCountdown.value--;
    } else {
      clearInterval(countdownInterval);
      startTraining();
      runTrainingCountdown();
    }
  }, 1000);
};

let trainingCountdownInterval;

const runTrainingCountdown = () => {
  trainingCountdownInterval = setInterval(() => {
    if (countdown.value > 1) {
      countdown.value--;
    } else {
      clearInterval(trainingCountdownInterval);
      stopTraining();
    }
  }, 10);
};

onMounted(async () => {
  const { terms: vocabularyTerms } = await getVocabulary();
  terms.value = vocabularyTerms.filter((item) => item.training);
  notPassedTerms.value = JSON.parse(JSON.stringify(terms.value));
  setQuestionTerm();
  setTranslationTerm();
});
</script>
