import { db } from 'src/db';
import { liveQuery } from 'dexie';
import { useLanguagesStore } from 'src/stores/languagesStore';
import { computed } from 'vue';
import { useErrors } from './useErrors';
import { phrasalVerbs } from 'src/data';
import { PhrasalVerb } from 'src/components/models';
import useAppEventBus from 'src/composables/useAppEventBus';
import useUtils from 'src/composables/useUtils';

export const usePhrasalVerbs = () => {
  const { $emit } = useAppEventBus();
  const languagesStore = useLanguagesStore();
  const { generateId } = useUtils();

  const currentLanguage = computed(() => {
    return languagesStore.currentLanguage;
  });
  const { alreadyExists } = useErrors();

  const getAllPhrasalVerbs = async () => {
    return db.phrasalVerbs
      .where({ lang: currentLanguage.value })
      .sortBy('term');
  };

  const getPhrasalVerbs = (offset = 0, trainingValue?: boolean) => {
    const searchLower = languagesStore.searchValue?.toLowerCase();
    return liveQuery(() =>
      db.phrasalVerbs
        .where('lang')
        .equals(currentLanguage.value)
        .filter((item) => {
          return (
            (!trainingValue || item.training === trainingValue) &&
            (item.term.toLowerCase().includes(searchLower) ||
              item.translation.toLowerCase().includes(searchLower))
          );
        })
        .offset(offset)
        .limit(15)
        .sortBy('term')
    );
  };

  const getPhrasalVerb = async (query: object) => {
    return await db.phrasalVerbs
      .where({ lang: currentLanguage.value, ...query })
      .first();
  };

  const addNewPhrasalVerb = async (data: PhrasalVerb) => {
    if (await getPhrasalVerb({ term: data.term })) {
      alreadyExists('phrasal verb', data.term);
    }
    await db.phrasalVerbs.add({ ...data, lang: currentLanguage.value });
    $emit('request-phrasal-verbs');
  };

  const removePhrasalVerb = async (id: string) => {
    await db.phrasalVerbs.where({ lang: currentLanguage.value, id }).delete();
  };

  const editPhrasalVerb = async (
    id: string,
    data: PhrasalVerb,
    refresh?: boolean
  ) => {
    await db.phrasalVerbs
      .where({ lang: currentLanguage.value, id })
      .modify(data);
    refresh && $emit('request-phrasal-verbs');
  };

  const seedPhrasalVerbs = async () => {
    if (!(await getAllPhrasalVerbs()).length) {
      phrasalVerbs.forEach(
        async (verb: {
          term: string;
          translation: string;
          explanation?: string;
        }) => {
          await addNewPhrasalVerb({
            ...verb,
            lang: currentLanguage.value,
            id: generateId(),
            training: false,
            explanation: '',
          });
        }
      );
    }
  };
  return {
    getPhrasalVerb,
    getPhrasalVerbs,
    getAllPhrasalVerbs,
    addNewPhrasalVerb,
    removePhrasalVerb,
    editPhrasalVerb,
    seedPhrasalVerbs,
  };
};
