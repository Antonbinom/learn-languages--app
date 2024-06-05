import { ref, watch, onMounted } from 'vue';
import { useObservable } from '@vueuse/rxjs';
import useAppEventBus from 'src/composables/useAppEventBus';
import { useLanguagesStore } from 'src/stores/languagesStore';

// eslint-disable-next-line @typescript-eslint/ban-types
const useTermsFetcher = (method: Function, event: string) => {
  const languagesStore = useLanguagesStore();

  const { $on } = useAppEventBus();

  const terms = ref();

  const isTraining = ref(false);
  const fetchData = (offset: string) => {
    const data = useObservable(method(offset, isTraining.value));
    setTimeout(() => {
      terms.value.value?.push(...(<[]>data?.value));
    }, 200);
  };

  const fetchFilteredData = (offset: string, trainingValue: boolean) => {
    const data = useObservable(method(offset, trainingValue));
    terms.value = data;
    isTraining.value = trainingValue;
  };

  $on(event, () => {
    terms.value = useObservable(method(0, isTraining.value));
  });

  watch(
    () => languagesStore.searchValue || languagesStore.currentLanguage,
    async () => {
      terms.value = useObservable(method(0, isTraining.value));
    }
  );

  onMounted(async () => {
    terms.value = useObservable(method(0, false));
  });

  return {
    terms,
    fetchData,
    isTraining,
    languagesStore,
    fetchFilteredData,
  };
};

export default useTermsFetcher;
