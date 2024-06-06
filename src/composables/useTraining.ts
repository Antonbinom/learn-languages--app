import { computed, onMounted, ref, reactive } from 'vue';
import { useLanguagesStore } from 'src/stores/languagesStore';
import useTerms from 'src/composables/useTerms';
import { Term } from 'src/components/models';
export default function useTraining() {
  const { currentLanguage } = useLanguagesStore();
  const { getTerms } = useTerms();

  const isPresettings = ref<boolean>(true);
  const isTraining = ref<boolean>(false);
  const isResults = ref<boolean>(false);
  const isCountdownRuns = ref<boolean>(false);
  const status = ref<string>('neutral');

  const trainingMode = ref<string>(`${currentLanguage} - russian`);
  const isTimeMode = ref<boolean>(true);

  const terms = ref<Term[]>([]);
  const passedTerms = ref<Term[]>([]);
  const notPassedTerms = ref<Term[]>([]);
  const answerTerms = ref<Term[]>([]);
  const questionTerm = ref<Term>();
  const translationTerm = ref<Term>();

  const results = reactive({
    correctAnswers: 0,
    wrongAnswers: 0,
    percents: 0,
    unknown: [],
  });

  const bodyColor = computed(() => {
    if (status.value === 'correct') return 'bg-green-2';
    else if (status.value === 'wrong') return 'bg-red-2';
    else return '';
  });

  const moveTermToPassedTerms = () => {
    const passedTermIndex = notPassedTerms.value.findIndex(
      (item: Term) => item.id === questionTerm.value?.id
    );
    passedTerms.value.push(notPassedTerms.value?.[passedTermIndex]);
    notPassedTerms.value.splice(passedTermIndex, 1);
  };

  const setQuestionTerm = () => {
    const randomIndex = Math.floor(Math.random() * notPassedTerms.value.length);
    questionTerm.value = notPassedTerms.value?.[randomIndex];
  };

  const setAnswerTerms = () => {
    const filteredTerms = terms.value.filter(
      (item) => item.id !== questionTerm.value?.id
    );

    const randomAnswers = [...Array(3)].map(
      () =>
        filteredTerms.splice(
          Math.floor(Math.random() * filteredTerms.length),
          1
        )[0]
    );

    questionTerm.value && randomAnswers.push(questionTerm.value);

    for (let i = randomAnswers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [randomAnswers[i], randomAnswers[j]] = [
        randomAnswers[j],
        randomAnswers[i],
      ];
    }

    answerTerms.value = randomAnswers;
  };

  const setTranslationTerm = () => {
    const filteredTerms = terms.value.filter(
      (item) => item.id !== questionTerm.value?.id
    );
    const randomIndex = Math.floor(Math.random() * filteredTerms.length);
    const randomTranslationsIndex = Math.random() >= 0.5 ? 1 : 0;

    translationTerm.value = [questionTerm.value, terms.value[randomIndex]][
      randomTranslationsIndex
    ];
  };

  const setAnswer = (value: string) => {
    const isTermsEqual =
      (trainingMode.value === `${currentLanguage} - russian`
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
        +((results.correctAnswers / totalQuestions) * 100).toFixed(0) || 0;
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
    results.unknown = [];
  }

  onMounted(async () => {
    const data: Term[] = await getTerms();
    terms.value = data;
    notPassedTerms.value = [...data];
    setQuestionTerm();
    setTranslationTerm();
    setAnswerTerms();
  });

  return {
    isPresettings,
    isTraining,
    isResults,
    isCountdownRuns,
    status,
    trainingMode,
    isTimeMode,
    terms,
    passedTerms,
    notPassedTerms,
    questionTerm,
    results,
    bodyColor,
    setAnswer,
    startTraining,
    stopTraining,
    resetTraining,
    setQuestionTerm,
    translationTerm,
    currentLanguage,
    moveTermToPassedTerms,
    setTranslationTerm,
    answerTerms,
    setAnswerTerms,
  };
}
