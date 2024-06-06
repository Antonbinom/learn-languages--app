import { ref, onMounted, onUnmounted, Ref } from 'vue';
import { Term } from 'src/components/models';

interface Props {
  languageMode: string;
  questionTerm: Term;
  answerTerms?: Term[];
  translationTerm?: Term;
  setAnswer: (value: string) => void;
  isTimeMode?: boolean;
}

export default function useTrainingCountdown(
  props: Props,
  emit: (event: 'onStopTraining') => void
) {
  const countdown: Ref<number> = ref(6000);
  let trainingCountdownInterval: number | ReturnType<typeof setInterval>;

  const runTrainingCountdown = () => {
    trainingCountdownInterval = setInterval(() => {
      if (countdown.value > 1) {
        countdown.value--;
      } else {
        clearInterval(trainingCountdownInterval);
        emit('onStopTraining');
      }
    }, 10);
  };

  const stopTraining = () => {
    emit('onStopTraining');
  };

  onMounted(() => {
    props.isTimeMode && runTrainingCountdown();
  });

  onUnmounted(() => {
    props.isTimeMode && clearInterval(trainingCountdownInterval);
    emit('onStopTraining');
  });

  return {
    countdown,
    stopTraining,
  };
}
