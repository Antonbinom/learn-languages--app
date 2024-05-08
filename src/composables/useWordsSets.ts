import { db } from 'src/db';
import { useLanguagesStore } from 'src/stores/languagesStore';
import { computed } from 'vue';
// import useAppEventBus from 'src/composables/useAppEventBus';

export const useWordsSets = () => {
  // const { $emit } = useAppEventBus();
  const languagesStore = useLanguagesStore();
  const currentLanguage = computed(() => {
    return languagesStore.currentLanguage;
  });

  const createWordsSet = async (name: string) => {
    await db.wordsSets.add({ name, lang: currentLanguage.value, terms: [] });
  };

  const getAllWordsSets = async () => await db.wordsSets.toArray();

  const getWordsSet = async (name: string) => {
    const wordsSet = await db.wordsSets
      .where('lang')
      .equals(currentLanguage.value)
      .and((set) => set.name === name)
      .first();

    return wordsSet;
  };

  const addTermsToWordsSet = async (name: string, termsIds: string[]) => {
    if (!(await getWordsSet(name))) {
      await createWordsSet(name);
    }
    await db.wordsSets
      .where('lang')
      .equals(currentLanguage.value)
      .and((set) => set.name === name)
      .modify((set) => {
        set.terms = [...termsIds, ...set.terms];
      });
  };

  return {
    createWordsSet,
    getAllWordsSets,
    getWordsSet,
    addTermsToWordsSet,
  };
};
