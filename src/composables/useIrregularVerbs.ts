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
export const useIrregularVerbs = () => {
  const { $emit } = useAppEventBus();
  const languagesStore = useLanguagesStore();
  const currentLanguage = computed(() => {
    return languagesStore.currentLanguage;
  });
  const { alreadyExists } = useErrors();

  const createIrregularVerbsCollection = async () => {
    await db.irregularVerbs.add({ lang: currentLanguage.value, terms: [] });
  };

  const getFilteredTerms = (terms: Term[], searchTerm: string) => {
    const searchLower = searchTerm.toLowerCase();
    return terms.filter(
      (item) =>
        item.term.toLowerCase().includes(searchLower.toLowerCase()) ||
        item.translation.toLowerCase().includes(searchLower.toLowerCase())
    );
  };

  const getIrregularVerbs = async () => {
    return await db.irregularVerbs
      .where('lang')
      .equals(currentLanguage.value)
      .first();
  };

  const getFilteredIrregularVerbs = () => {
    const languageName = currentLanguage.value;

    const irregularVerbsPromise = db.irregularVerbs
      .where('lang')
      .equals(languageName)
      .first()
      .then((res) => res?.terms || []);

    const filteredIrregularVerbs = liveQuery(() =>
      irregularVerbsPromise.then((terms) =>
        getFilteredTerms(terms, languagesStore.searchValue)
      )
    );

    return filteredIrregularVerbs;
  };

  const addNewIrregularVerb = async (data: Term) => {
    if (!(await getIrregularVerbs())) {
      await createIrregularVerbsCollection();
    }
    if (await getIrregularVerb(data.term)) {
      alreadyExists('irregular verb', data.term);
    }

    await db.irregularVerbs
      .where('lang')
      .equals(currentLanguage.value)
      .modify((collection) => {
        collection.terms.push(data);
      });
    $emit('request-irregular-verbs');
  };

  const getIrregularVerb = async (name: string) => {
    const collection = await db.irregularVerbs
      .where('lang')
      .equals(currentLanguage.value)
      .first();

    return collection?.terms.find(
      (term) => term.id === `${name}-${currentLanguage.value}`
    );
  };

  const removeIrregularVerb = async (termId: string) => {
    const collection = await db.irregularVerbs
      .where('lang')
      .equals(currentLanguage.value)
      .first();

    const termIndex = collection?.terms.findIndex((term) => term.id === termId);
    if (termIndex === undefined) return;

    db.irregularVerbs
      .where('lang')
      .equals(currentLanguage.value)
      .modify((collection) => {
        collection.terms.splice(termIndex, 1);
      });
  };

  const editIrregularVerb = async (termId: string, data: Term) => {
    if (await getIrregularVerb(data.term)) {
      alreadyExists('irregular verb', data.term);
    }
    const collection = await db.irregularVerbs
      .where('lang')
      .equals(currentLanguage.value)
      .first();

    const termIndex = collection?.terms.findIndex((term) => term.id === termId);
    if (termIndex === undefined) return;

    await db.irregularVerbs
      .where('lang')
      .equals(currentLanguage.value)
      .modify((collection) => {
        collection.terms[termIndex] = data;
      });
    $emit('request-irregular-verbs');
  };

  return {
    createIrregularVerbsCollection,
    getIrregularVerb,
    getIrregularVerbs,
    getFilteredIrregularVerbs,
    addNewIrregularVerb,
    removeIrregularVerb,
    editIrregularVerb,
  };
};
