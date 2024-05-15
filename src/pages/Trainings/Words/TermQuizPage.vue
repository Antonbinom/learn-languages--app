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

    ModeTogglerComponent(
      v-if="isPresettings && !isCountdownRuns"
      :currentLanguage="currentLanguage"
      :trainingMode="trainingMode"
      @toggleTrainingMode="trainingMode = $event"
    )
    QuizComponent(
      v-if="isTraining"
      :trainingMode="trainingMode"
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

<script setup>
import { computed, onMounted, ref, reactive } from 'vue';
//Components
import PrestartingComponent from 'src/components/Trainings/PrestartingComponent.vue';
import ModeTogglerComponent from 'src/components/Trainings/ModeTogglerComponent.vue';
import QuizComponent from 'src/components/Trainings/QuizComponent.vue';
import ResultsComponent from 'src/components/Trainings/ResultsComponent.vue';
import ButtonClose from 'src/components/Trainings/ButtonClose.vue';

import { useVocabulary } from 'src/composables/useVocabulary';
//Stores
import { useLanguagesStore } from 'src/stores/languagesStore';
//
const { currentLanguage } = useLanguagesStore();

const { getVocabulary } = useVocabulary();

const isPresettings = ref(true);
const isTraining = ref(false);
const isResults = ref(false);
const isCountdownRuns = ref(false);
const status = ref('neutral');

const trainingMode = ref(`${currentLanguage} - russian`);

const terms = ref([]);
const passedTerms = ref([]);
const notPassedTerms = ref([]);
const questionTerm = ref({});
const answerTerms = ref([]);
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

const setAnswerTerms = () => {
  const filteredTerms = terms.value.filter(
    (item) => item.id !== questionTerm.value.id
  );

  const randomAnswers = [...Array(3)].map(
    () =>
      filteredTerms.splice(
        Math.floor(Math.random() * filteredTerms.length),
        1
      )[0]
  );

  randomAnswers.push(questionTerm.value);

  for (let i = randomAnswers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [randomAnswers[i], randomAnswers[j]] = [randomAnswers[j], randomAnswers[i]];
  }

  answerTerms.value = randomAnswers;
};

const setAnswer = (value) => {
  const isTermsEqual =
    trainingMode.value === `${currentLanguage} - russian`
      ? questionTerm.value.translation === value.translation
      : questionTerm.value.term === value.term;
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
  isCountdownRuns.value = true;
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
  const { terms: vocabularyTerms } = await getVocabulary();
  terms.value = vocabularyTerms.filter((item) => item.training);
  notPassedTerms.value = [...terms.value];
  setQuestionTerm();
  setAnswerTerms();
});
</script>
