import { db } from 'src/db';
import { liveQuery } from 'dexie';
import { useLanguagesStore } from 'src/stores/languagesStore';
import { computed } from 'vue';
import useAppEventBus from 'src/composables/useAppEventBus';

interface Term {
  id: string;
  term: string;
  translation: string;
  explanation: string;
  training: boolean;
}
export const useVocabulary = () => {
  const { $emit } = useAppEventBus();
  const languagesStore = useLanguagesStore();
  const currentLanguage = computed(() => {
    return languagesStore.currentLanguage;
  });

  const createVocabulary = async () => {
    await db.vocabularies.add({ name: currentLanguage.value, terms: [] });
  };

  const getAllVocabularies = () => liveQuery(() => db.vocabularies.toArray());

  // const getVocabulary = () => {
  //   const vocabulary = liveQuery(() =>
  //     db.vocabularies
  //       .where('name')
  //       .equals(currentLanguage.value)
  //       .first()
  //       .then((res) =>
  //         res?.terms.filter((item) => {
  //           return (
  //             item.term.includes(languagesStore.searchValue.toLowerCase()) ||
  //             item.translation.includes(
  //               languagesStore.searchValue.toLowerCase()
  //             )
  //           );
  //         })
  //       )
  //   );

  //   return vocabulary;
  // };

  const getFilteredTerms = (terms: Term[], searchTerm: string) => {
    const searchLower = searchTerm.toLowerCase();
    return terms.filter(
      (item) =>
        item.term.includes(searchLower) ||
        item.translation.includes(searchLower)
    );
  };

  const getVocabulary = () => {
    const languageName = currentLanguage.value;

    const vocabularyPromise = db.vocabularies
      .where('name')
      .equals(languageName)
      .first()
      .then((res) => res?.terms || []);

    const filteredVocabulary = liveQuery(() =>
      vocabularyPromise.then((terms) =>
        getFilteredTerms(terms, languagesStore.searchValue)
      )
    );

    return filteredVocabulary;
  };

  const addNewVocabularyTerm = async (term: Term) => {
    await db.vocabularies
      .where('name')
      .equals(currentLanguage.value)
      .modify((vocabulary) => {
        vocabulary.terms.push(term);
      });
    $emit('request-vocabulary');
  };

  const getVocabularyTerm = async (name: string) => {
    const vocabulary = await db.vocabularies
      .where('name')
      .equals(currentLanguage.value)
      .first();

    return vocabulary?.terms.find(
      (term) => term.id === `${name}-${currentLanguage.value}`
    );
  };

  const removeVocabularyTerm = async (termId: string) => {
    const vocabulary = await db.vocabularies
      .where('name')
      .equals(currentLanguage.value)
      .first();

    const termIndex = vocabulary?.terms.findIndex((term) => term.id === termId);
    if (termIndex === undefined) return;

    db.vocabularies
      .where('name')
      .equals(currentLanguage.value)
      .modify((vocabulary) => {
        vocabulary.terms.splice(termIndex, 1);
      });
  };

  const editVocabularyTerm = async (termId: string, data: Term) => {
    const vocabulary = await db.vocabularies
      .where('name')
      .equals(currentLanguage.value)
      .first();

    const termIndex = vocabulary?.terms.findIndex((term) => term.id === termId);
    if (termIndex === undefined) return;

    await db.vocabularies
      .where('name')
      .equals(currentLanguage.value)
      .modify((vocabulary) => {
        vocabulary.terms[termIndex] = data;
      });
    $emit('request-vocabulary');
  };

  return {
    createVocabulary,
    getAllVocabularies,
    getVocabulary,
    addNewVocabularyTerm,
    removeVocabularyTerm,
    editVocabularyTerm,
    getVocabularyTerm,
  };
};
