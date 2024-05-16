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
export const usePhrasalVerbs = () => {
  const { $emit } = useAppEventBus();
  const languagesStore = useLanguagesStore();
  const currentLanguage = computed(() => {
    return languagesStore.currentLanguage;
  });

  const createPhrasalVerbsCollection = async () => {
    await db.phrasalVerbs.add({ lang: currentLanguage.value, terms: [] });
  };

  const getFilteredTerms = (terms: Term[], searchTerm: string) => {
    const searchLower = searchTerm.toLowerCase();
    return terms.filter(
      (item) =>
        item.term.includes(searchLower) ||
        item.translation.includes(searchLower)
    );
  };

  const getPhrasalVerbs = async () => {
    return await db.phrasalVerbs
      .where('lang')
      .equals(currentLanguage.value)
      .first();
  };

  const getPhrasalVerbsCollection = () => {
    const languageName = currentLanguage.value;

    const phrasalVerbsPromise = db.phrasalVerbs
      .where('lang')
      .equals(languageName)
      .first()
      .then((res) => res?.terms || []);

    const filteredPhrasalVerbs = liveQuery(() =>
      phrasalVerbsPromise.then((terms) =>
        getFilteredTerms(terms, languagesStore.searchValue)
      )
    );

    return filteredPhrasalVerbs;
  };

  const addNewPhrasalVerb = async (term: Term) => {
    if (!(await db.phrasalVerbs.toArray()).length) {
      await createPhrasalVerbsCollection();
    }
    await db.phrasalVerbs
      .where('lang')
      .equals(currentLanguage.value)
      .modify((collection) => {
        collection.terms.push(term);
      });
    $emit('request-phrasal-verbs');
  };

  const getPhrasalVerb = async (name: string) => {
    const collection = await db.phrasalVerbs
      .where('lang')
      .equals(currentLanguage.value)
      .first();

    return collection?.terms.find(
      (term) => term.id === `${name}-${currentLanguage.value}`
    );
  };

  const removePhrasalVerb = async (termId: string) => {
    const collection = await db.phrasalVerbs
      .where('lang')
      .equals(currentLanguage.value)
      .first();

    const termIndex = collection?.terms.findIndex((term) => term.id === termId);
    if (termIndex === undefined) return;

    db.phrasalVerbs
      .where('lang')
      .equals(currentLanguage.value)
      .modify((collection) => {
        collection.terms.splice(termIndex, 1);
      });
  };

  const editPhrasalVerb = async (termId: string, data: Term) => {
    const collection = await db.phrasalVerbs
      .where('lang')
      .equals(currentLanguage.value)
      .first();

    const termIndex = collection?.terms.findIndex((term) => term.id === termId);
    if (termIndex === undefined) return;

    await db.phrasalVerbs
      .where('lang')
      .equals(currentLanguage.value)
      .modify((collection) => {
        collection.terms[termIndex] = data;
      });
    $emit('request-phrasal-verbs');
  };

  return {
    createPhrasalVerbsCollection,
    getPhrasalVerb,
    getPhrasalVerbs,
    getPhrasalVerbsCollection,
    addNewPhrasalVerb,
    removePhrasalVerb,
    editPhrasalVerb,
  };
};
