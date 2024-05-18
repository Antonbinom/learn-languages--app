import { db } from 'src/db';
import { useLanguagesStore } from 'src/stores/languagesStore';
import { computed } from 'vue';
import useAppEventBus from 'src/composables/useAppEventBus';
import { useErrors } from './useErrors';

export const usePhrasalVerbsCollections = () => {
  const { $emit } = useAppEventBus();
  const languagesStore = useLanguagesStore();
  const currentLanguage = computed(() => {
    return languagesStore.currentLanguage;
  });
  const { alreadyExists, notExists } = useErrors();

  const createPhrasalVerbsCollection = async (
    name: string,
    terms: string[]
  ) => {
    if (await getPhrasalVerbsCollection(name)) {
      alreadyExists('phrasal verbs collection', name);
    }
    await db.phrasalVerbsCollections.add({
      name,
      lang: currentLanguage.value,
      terms,
    });
  };

  const getAllPhrasalVerbsCollections = async () =>
    await db.phrasalVerbsCollections.toArray();

  const getPhrasalVerbsCollection = async (name: string) => {
    const wordsCollection = await db.phrasalVerbsCollections
      .where('lang')
      .equals(currentLanguage.value)
      .and((collection) => collection.name === name)
      .first();
    return wordsCollection;
  };

  const editPhrasalVerbsCollection = async (
    name: string,
    changedName: string,
    termsIds: string[]
  ) => {
    if (!(await getPhrasalVerbsCollection(changedName))) {
      alreadyExists('phrasal verbs collection', name);
    }
    await db.phrasalVerbsCollections
      .where('lang')
      .equals(currentLanguage.value)
      .and((collection) => collection.name === name)
      .modify((collection) => {
        collection.terms = [...new Set([...termsIds])];
        collection.name = changedName;
      });
  };

  const removePhrasalVerbsCollection = async (name: string) => {
    if (!(await getPhrasalVerbsCollection(name))) {
      notExists('phrasal verbs collection', name);
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
    createPhrasalVerbsCollection,
    getAllPhrasalVerbsCollections,
    getPhrasalVerbsCollection,
    editPhrasalVerbsCollection,
    removePhrasalVerbsCollection,
  };
};
