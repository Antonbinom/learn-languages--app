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
    await db.vocabularies.add({ lang: currentLanguage.value, terms: [] });
  };

  const getAllVocabularies = () => liveQuery(() => db.vocabularies.toArray());

  const getVocabulary = async () => {
    return await db.vocabularies
      .where('lang')
      .equals(currentLanguage.value)
      .first();
  };

  const getFilteredTerms = (terms: Term[], searchTerm: string) => {
    const searchLower = searchTerm.toLowerCase();
    return terms.filter(
      (item) =>
        item.term.toLowerCase().includes(searchLower) ||
        item.translation.toLowerCase().includes(searchLower)
    );
  };

  const getVocabularyTerms = () => {
    const vocabulary = getVocabulary().then((res) => res?.terms || []);

    const filteredVocabulary = liveQuery(() =>
      vocabulary.then((terms) =>
        getFilteredTerms(terms, languagesStore.searchValue)
      )
    );

    return filteredVocabulary;
  };

  const addNewVocabularyTerm = async (term: Term) => {
    if (!(await getVocabulary())) {
      await createVocabulary();
    }
    await db.vocabularies
      .where('lang')
      .equals(currentLanguage.value)
      .modify((vocabulary) => {
        vocabulary.terms.push(term);
      });
    $emit('request-vocabulary');
  };

  const getVocabularyTerm = async (id: string) => {
    const vocabulary = await getVocabulary();

    return vocabulary?.terms.find((term) => term.id === id);
  };

  const removeVocabularyTerm = async (id: string) => {
    const vocabulary = await db.vocabularies
      .where('lang')
      .equals(currentLanguage.value)
      .first();

    const termIndex = vocabulary?.terms.findIndex((term) => term.id === id);
    if (termIndex === undefined) return;

    db.vocabularies
      .where('lang')
      .equals(currentLanguage.value)
      .modify((vocabulary) => {
        vocabulary.terms.splice(termIndex, 1);
      });
  };

  const editVocabularyTerm = async (
    id: string,
    data: Term,
    refresh?: boolean
  ) => {
    const vocabulary = await db.vocabularies
      .where('lang')
      .equals(currentLanguage.value)
      .first();

    const termIndex = vocabulary?.terms.findIndex((term) => term.id === id);
    if (termIndex === undefined) return;

    await db.vocabularies
      .where('lang')
      .equals(currentLanguage.value)
      .modify((vocabulary) => {
        vocabulary.terms[termIndex] = data;
      });
    refresh && $emit('request-vocabulary');
  };

  return {
    createVocabulary,
    getAllVocabularies,
    getVocabularyTerms,
    getVocabulary,
    addNewVocabularyTerm,
    removeVocabularyTerm,
    editVocabularyTerm,
    getVocabularyTerm,
  };
};
