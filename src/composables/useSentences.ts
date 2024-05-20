import { db } from 'src/db';
import { liveQuery } from 'dexie';
import { useLanguagesStore } from 'src/stores/languagesStore';
import { computed } from 'vue';
import useAppEventBus from 'src/composables/useAppEventBus';
import { useErrors } from './useErrors';

interface Term {
  id: string;
  term: string;
  translation: string;
  explanation: string;
  training: boolean;
}
export const useSentences = () => {
  const { $emit } = useAppEventBus();
  const languagesStore = useLanguagesStore();
  const currentLanguage = computed(() => {
    return languagesStore.currentLanguage;
  });
  const { alreadyExists } = useErrors();

  const createSentencesCollection = async () => {
    await db.sentences.add({ lang: currentLanguage.value, terms: [] });
  };

  const getFilteredTerms = (terms: Term[], searchTerm: string) => {
    const searchLower = searchTerm.toLowerCase();
    return terms.filter(
      (item) =>
        item.term.toLowerCase().includes(searchLower.toLowerCase()) ||
        item.translation.toLowerCase().includes(searchLower.toLowerCase())
    );
  };

  const getSentences = async () => {
    return await db.sentences
      .where('lang')
      .equals(currentLanguage.value)
      .first();
  };

  const getFilteredSentences = () => {
    const languageName = currentLanguage.value;

    const sentencesPromise = db.sentences
      .where('lang')
      .equals(languageName)
      .first()
      .then((res) => res?.terms || []);

    const filteredSentences = liveQuery(() =>
      sentencesPromise.then((terms) =>
        getFilteredTerms(terms, languagesStore.searchValue)
      )
    );

    return filteredSentences;
  };

  const addNewSentence = async (data: Term) => {
    if (!(await getSentences())) {
      await createSentencesCollection();
    }
    if (await getSentence(data.term)) {
      alreadyExists('sentence', data.term);
    }

    await db.sentences
      .where('lang')
      .equals(currentLanguage.value)
      .modify((collection) => {
        collection.terms.push(data);
      });
    $emit('request-sentences');
  };

  const getSentence = async (name: string) => {
    const collection = await db.sentences
      .where('lang')
      .equals(currentLanguage.value)
      .first();

    const collectionItem = collection?.terms.find(
      (term) => term.id.replace(`-${currentLanguage.value}`, '') === name
    );
    console.log(collection);

    return collectionItem;
  };

  const removeSentence = async (termId: string) => {
    const collection = await db.sentences
      .where('lang')
      .equals(currentLanguage.value)
      .first();

    const termIndex = collection?.terms.findIndex((term) => term.id === termId);
    if (termIndex === undefined) return;

    db.sentences
      .where('lang')
      .equals(currentLanguage.value)
      .modify((collection) => {
        collection.terms.splice(termIndex, 1);
      });
  };

  const editSentence = async (termId: string, data: Term) => {
    if (await getSentence(data.term)) {
      alreadyExists('sentence', data.term);
    }
    const collection = await db.sentences
      .where('lang')
      .equals(currentLanguage.value)
      .first();

    const termIndex = collection?.terms.findIndex((term) => term.id === termId);
    if (termIndex === undefined) return;

    await db.sentences
      .where('lang')
      .equals(currentLanguage.value)
      .modify((collection) => {
        collection.terms[termIndex] = data;
      });
    $emit('request-sentences');
  };

  return {
    createSentencesCollection,
    getSentence,
    getSentences,
    getFilteredSentences,
    addNewSentence,
    removeSentence,
    editSentence,
  };
};
