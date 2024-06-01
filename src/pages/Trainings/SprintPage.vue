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
    ModeTogglerComponent(
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
import { computed, onMounted, ref, reactive } from 'vue';
//Components
import PrestartingComponent from 'src/components/Trainings/PrestartingComponent.vue';
import ModeTogglerComponent from 'src/components/Trainings/ModeTogglerComponent.vue';
import SprintComponent from 'src/components/Trainings/SprintComponent.vue';
import ResultsComponent from 'src/components/Trainings/ResultsComponent.vue';
import ButtonClose from 'src/components/Trainings/ButtonClose.vue';
//Stores
import { useLanguagesStore } from 'src/stores/languagesStore';
//
const { currentLanguage } = useLanguagesStore();
// Composables
import useTerms from 'src/composables/useTerms';
//
const { getTerms } = useTerms();

const isPresettings = ref(true);
const isTraining = ref(false);
const isResults = ref(false);
const isCountdownRuns = ref(false);
const status = ref('neutral');

const trainingMode = ref(`${currentLanguage} - russian`);
const isTimeMode = ref(true);

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
  notPassedTerms.value = [...terms.value];
  passedTerms.value = [];
  results.correctAnswers = 0;
  results.wrongAnswers = 0;
  results.percents = 0;
}

onMounted(async () => {
  terms.value = await getTerms();
  notPassedTerms.value = [...terms.value];
  setQuestionTerm();
  setTranslationTerm();
});
</script>
