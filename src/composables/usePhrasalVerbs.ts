import { db } from 'src/db';
import { liveQuery } from 'dexie';
import { useLanguagesStore } from 'src/stores/languagesStore';
import { computed } from 'vue';
import useAppEventBus from 'src/composables/useAppEventBus';
import { useErrors } from './useErrors';
import { phrasalVerbs } from 'src/data';
import useUtils from 'src/composables/useUtils';

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
  const { generateId } = useUtils();

  const currentLanguage = computed(() => {
    return languagesStore.currentLanguage;
  });
  const { alreadyExists } = useErrors();

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

  const getFilteredPhrasalVerbs = () => {
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

  const addNewPhrasalVerb = async (data: Term) => {
    if (!(await getPhrasalVerbs())) {
      await createPhrasalVerbsCollection();
    }
    if (await getPhrasalVerb(data.term)) {
      alreadyExists('phrasal verb', data.term);
    }

    await db.phrasalVerbs
      .where('lang')
      .equals(currentLanguage.value)
      .modify((collection) => {
        collection.terms.push(data);
      });
    $emit('request-phrasal-verbs');
  };

  const seedPhrasalVerbs = async () => {
    if (!(await getPhrasalVerbs())) {
      await createPhrasalVerbsCollection();
      await db.phrasalVerbs
        .where('lang')
        .equals(currentLanguage.value)
        .modify((collection) => {
          phrasalVerbs.forEach(
            (verb: {
              term: string;
              translation: string;
              explanation?: string;
            }) => {
              collection.terms.push({
                ...verb,
                id: generateId(),
                training: false,
                explanation: '',
              });
            }
          );
        });
    }
  };

  const getPhrasalVerb = async (id: string) => {
    const collection = await db.phrasalVerbs
      .where('lang')
      .equals(currentLanguage.value)
      .first();

    return collection?.terms.find((term) => term.id === id);
  };

  const removePhrasalVerb = async (id: string) => {
    const collection = await db.phrasalVerbs
      .where('lang')
      .equals(currentLanguage.value)
      .first();

    const termIndex = collection?.terms.findIndex((term) => term.id === id);
    if (termIndex === undefined) return;

    db.phrasalVerbs
      .where('lang')
      .equals(currentLanguage.value)
      .modify((collection) => {
        collection.terms.splice(termIndex, 1);
      });
  };

  const editPhrasalVerb = async (id: string, data: Term, refresh?: boolean) => {
    // if (await getPhrasalVerb(data.term)) {
    //   alreadyExists('phrasal verb', data.term);
    // }
    const collection = await db.phrasalVerbs
      .where('lang')
      .equals(currentLanguage.value)
      .first();

    const termIndex = collection?.terms.findIndex((term) => term.id === id);
    if (termIndex === undefined) return;

    await db.phrasalVerbs
      .where('lang')
      .equals(currentLanguage.value)
      .modify((collection) => {
        collection.terms[termIndex] = data;
      });
    refresh && $emit('request-phrasal-verbs');
  };

  return {
    createPhrasalVerbsCollection,
    getPhrasalVerb,
    getPhrasalVerbs,
    getFilteredPhrasalVerbs,
    addNewPhrasalVerb,
    removePhrasalVerb,
    editPhrasalVerb,
    seedPhrasalVerbs,
  };
};
