import { db } from 'src/db';
import { useLanguagesStore } from 'src/stores/languagesStore';
import { computed } from 'vue';
import useAppEventBus from 'src/composables/useAppEventBus';

export const useWordsSets = () => {
  const { $emit } = useAppEventBus();
  const languagesStore = useLanguagesStore();
  const currentLanguage = computed(() => {
    return languagesStore.currentLanguage;
  });

  const createWordsSet = async (name: string, terms: string[]) => {
    await db.wordsSets.add({ name, lang: currentLanguage.value, terms });
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

  const editWordsSet = async (
    name: string,
    changedName: string,
    termsIds: string[]
  ) => {
    await db.wordsSets
      .where('lang')
      .equals(currentLanguage.value)
      .and((set) => set.name === name)
      .modify((set) => {
        set.terms = [...new Set([...termsIds])];
        set.name = changedName;
      });
  };

  const removeWordsSet = async (name: string) => {
    if (!(await getWordsSet(name))) {
    } else {
      await db.wordsSets
        .where('lang')
        .equals(currentLanguage.value)
        .and((set) => set.name === name)
        .delete();
    }
    $emit('request-words-sets');
  };

  return {
    createWordsSet,
    getAllWordsSets,
    getWordsSet,
    removeWordsSet,
    editWordsSet,
  };
};
