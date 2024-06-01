import { db } from 'src/db';
import { useLanguagesStore } from 'src/stores/languagesStore';
import { computed } from 'vue';
import useAppEventBus from 'src/composables/useAppEventBus';
import { useErrors } from './useErrors';

export const useWordsCollections = () => {
  const { $emit } = useAppEventBus();
  const languagesStore = useLanguagesStore();
  const currentLanguage = computed(() => {
    return languagesStore.currentLanguage;
  });
  const { alreadyExists, notExists } = useErrors();

  const createWordsCollection = async (name: string, terms: string[]) => {
    if (await getWordsCollection(name)) {
      alreadyExists('words collection', name);
    }
    await db.wordsCollections.add({ name, lang: currentLanguage.value, terms });
  };

  const getAllwordsCollections = async () =>
    await db.wordsCollections.toArray();

  const getWordsCollection = async (name: string) => {
    const wordsCollection = await db.wordsCollections
      .where('lang')
      .equals(currentLanguage.value)
      .and((collection) => collection.name.toLowerCase() === name.toLowerCase())
      .first();

    return wordsCollection;
  };

  const editwordsCollection = async (
    name: string,
    changedName: string,
    termsIds: string[]
  ) => {
    if (!(await getWordsCollection(changedName))) {
      alreadyExists('words collection', changedName);
    }
    await db.wordsCollections
      .where('lang')
      .equals(currentLanguage.value)
      .and((collection) => collection.name === name)
      .modify((collection) => {
        collection.terms = [...new Set([...termsIds])];
        collection.name = changedName;
      });
  };

  const removewordsCollection = async (name: string) => {
    if (!(await getWordsCollection(name))) {
      notExists('words collection', name);
    } else {
      await db.wordsCollections
        .where('lang')
        .equals(currentLanguage.value)
        .and((collection) => collection.name === name)
        .delete();
    }
    $emit('request-words-collections');
  };

  return {
    createWordsCollection,
    getAllwordsCollections,
    getWordsCollection,
    removewordsCollection,
    editwordsCollection,
  };
};
