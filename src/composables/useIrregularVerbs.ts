import { db } from 'src/db';
import { liveQuery } from 'dexie';
import { useLanguagesStore } from 'src/stores/languagesStore';
import { computed } from 'vue';
import useAppEventBus from 'src/composables/useAppEventBus';
import { useErrors } from './useErrors';
import { irregularVerbs } from 'src/data';
import useUtils from 'src/composables/useUtils';

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
  const { generateId } = useUtils();
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

    const collection = await getIrregularVerbs();

    const existingIrregularVerb = collection?.terms.find(
      (item) => item.term === data.term
    );
    if (existingIrregularVerb) {
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

  const seedIrregularVerbs = async () => {
    if (!(await getIrregularVerbs())) {
      await createIrregularVerbsCollection();
      await db.irregularVerbs
        .where('lang')
        .equals(currentLanguage.value)
        .modify((collection) => {
          irregularVerbs.forEach(
            (verb: {
              term: string;
              translation: string;
              explanation: string;
            }) => {
              collection.terms.push({
                ...verb,
                id: generateId(),
                training: false,
              });
            }
          );
        });
    }
  };

  const getIrregularVerb = async (id: string) => {
    const collection = await getIrregularVerbs();

    const data = collection?.terms.find((term) => term.id === id);
    if (!data) return;
    return {
      id: data.id,
      term: data.term.split(', '),
      translation: data.translation,
      training: data.training,
      explanation: data.explanation,
    };
  };

  const removeIrregularVerb = async (id: string) => {
    const collection = await getIrregularVerbs();

    const termIndex = collection?.terms.findIndex((term) => term.id === id);
    if (termIndex === undefined) return;

    db.irregularVerbs
      .where('lang')
      .equals(currentLanguage.value)
      .modify((collection) => {
        collection.terms.splice(termIndex, 1);
      });
  };

  const editIrregularVerb = async (
    id: string,
    data: Term,
    refresh?: boolean
  ) => {
    // if (await getIrregularVerbByName(data.term)) {
    //   alreadyExists('irregular verb', data.term);
    // }
    const collection = await getIrregularVerbs();

    const termIndex = collection?.terms.findIndex((term) => term.id === id);
    if (termIndex === undefined) return;

    await db.irregularVerbs
      .where('lang')
      .equals(currentLanguage.value)
      .modify((collection) => {
        collection.terms[termIndex] = data;
      });
    refresh && $emit('request-irregular-verbs');
  };

  // const getIrregularVerbByName = async (name: string) => {
  //   const collection = await getIrregularVerbs();

  //   return collection?.terms.find((item) => item.term === name);
  // };
  return {
    createIrregularVerbsCollection,
    getIrregularVerb,
    getIrregularVerbs,
    getFilteredIrregularVerbs,
    addNewIrregularVerb,
    removeIrregularVerb,
    editIrregularVerb,
    seedIrregularVerbs,
  };
};
