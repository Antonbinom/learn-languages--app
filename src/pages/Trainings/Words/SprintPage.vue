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
  .q-px-md(v-if="isTraining")
    q-knob(
      reverse
      v-model="countdown"
      show-value
      readonly
      :min="0"
      :max="6000"
      size="150px"
      :thickness="0.05"
      color="teal"
      center-color="white"
      track-color="grey"
      class="q-my-xl"
      )
      span {{ Math.ceil(countdown/100) }}
    .text-h5.text-bold.q-mb-lg {{ `${trainingMode === 'English - Russian' ? questionTerm?.term : questionTerm?.translation}` }}
    .text-h6 {{ `${trainingMode !== 'English - Russian' ? translationTerm?.term : translationTerm?.translation}` }}
  .q-px-md(v-if="isPresettings")
    q-knob.cursor-pointer(
      v-model="prestartingCountdown"
      show-value
      readonly
      size="150px"
      :thickness="0.02"
      color="teal"
      center-color="white"
      track-color="teal"
      class="q-my-xl"
      @click="runPrestartingCountdown()"
      )
      span {{ `${prestartingCountdown>0 ? prestartingCountdown : 'Start'}` }}
  .q-px-md(v-if="isResults")
    q-knob(
      v-model="results.percents"
      show-value
      readonly
      min="0"
      max="100"
      size="150px"
      :thickness="0.05"
      :color="(results.percents < 25 && 'red')|| (results.percents < 50 && 'red-4') || (results.percents < 75 && 'warning') ||'teal'"
      center-color="white"
      track-color="grey"
      class="q-my-xl"
      )
      span {{ results.percents }}%
    .text-h5 {{$t('correct answers')}}: {{ results.correctAnswers }}
    .text-h5 {{$t('wrong answers')}}: {{ results.wrongAnswers }}

  q-btn-group.q-gutter-xl.q-pb-xl.absolute-bottom.q-px-md(spread flat)
    q-btn(v-if="isTraining" color="warning" :label="$t('no')" @click="setAnswer(false)")
    q-btn(v-if="isTraining" color="teal" :label="$t('yes')" @click="setAnswer(true)")
    q-btn(v-if="isResults" color="warning" :label="$t('back')" @click="resetTraining()")
    q-btn(v-if="isResults" color="teal" :label="$t('try again')" @click="runPrestartingCountdown()")

  q-toggle(
    v-if="isPresettings"
    :label="trainingMode"
    color="teal"
    :false-value="`${currentLanguage} - russian`"
    :true-value="`russian - ${currentLanguage}`"
    v-model="trainingMode"
    )

</template>

<script setup>
import { computed, onMounted, ref, reactive } from 'vue';
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

const prestartingCountdown = ref(0);

const countdown = ref(6000);
const status = ref('neutral');
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
  }, 150);
};

function stopTraining() {
  isTraining.value = false;
  isResults.value = true;
  status.value = 'neutral';
  const totalQuestions = results.correctAnswers + results.wrongAnswers;
  const correctAnswers = results.correctAnswers;

  const percentageCorrect = (correctAnswers / totalQuestions) * 100;
  results.percents = percentageCorrect.toFixed(0);
}

function resetTraining() {
  isTraining.value = false;
  isResults.value = false;
  isPresettings.value = true;
}

const runPrestartingCountdown = () => {
  prestartingCountdown.value = 3;
  const countdownInterval = setInterval(() => {
    if (prestartingCountdown.value > 1) {
      prestartingCountdown.value = prestartingCountdown.value - 1;
    } else {
      clearInterval(countdownInterval);
      isTraining.value = true;
      isPresettings.value = false;
      runTrainingCountdown();
    }
  }, 1000);
};

let trainingCountdownInterval;

const runTrainingCountdown = () => {
  trainingCountdownInterval = setInterval(() => {
    if (countdown.value > 1) {
      countdown.value = countdown.value - 1;
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
