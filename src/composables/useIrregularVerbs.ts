import { db } from 'src/db';
import { liveQuery } from 'dexie';
import { useLanguagesStore } from 'src/stores/languagesStore';
import { computed } from 'vue';
import { useErrors } from './useErrors';
import { irregularVerbs } from 'src/data';
import { IrregularVerb } from 'src/components/models';
import useAppEventBus from 'src/composables/useAppEventBus';
import useUtils from 'src/composables/useUtils';

export const useIrregularVerbs = () => {
  const { $emit } = useAppEventBus();
  const languagesStore = useLanguagesStore();
  const { generateId } = useUtils();
  const currentLanguage = computed(() => {
    return languagesStore.currentLanguage;
  });
  const { alreadyExists } = useErrors();

  const getAllIrregularVerbs = async () => {
    return db.irregularVerbs
      .where({ lang: currentLanguage.value })
      .sortBy('term');
  };

  const getIrregularVerbs = () => {
    const searchLower = languagesStore.searchValue?.toLowerCase();

    return liveQuery(() =>
      db.irregularVerbs
        .where('lang')
        .equals(currentLanguage.value)
        .and(
          (item) =>
            item.term.toLowerCase().includes(searchLower) ||
            item.translation.toLowerCase().includes(searchLower)
        )
        .sortBy('term')
    );
  };

  const getIrregularVerb = async (query: object) => {
    return await db.irregularVerbs
      .where({ lang: currentLanguage.value, ...query })
      .first();

    // return {
    //   id: data.id,
    //   term: data.term.split(', '),
    //   translation: data.translation,
    //   training: data.training,
    //   explanation: data.explanation,
    // };
  };

  const addNewIrregularVerb = async (data: IrregularVerb) => {
    if (await getIrregularVerb({ term: data.term })) {
      alreadyExists('irregular verb', data.term);
    }
    await db.irregularVerbs.add({ ...data, lang: currentLanguage.value });
    $emit('request-irregular-verbs');
  };

  const seedIrregularVerbs = async () => {
    if (!(await getAllIrregularVerbs()).length) {
      irregularVerbs.forEach(
        async (verb: {
          term: string;
          translation: string;
          explanation?: string;
        }) => {
          await addNewIrregularVerb({
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

  const removeIrregularVerb = async (id: string) => {
    await db.irregularVerbs.where({ lang: currentLanguage.value, id }).delete();
  };

  const editIrregularVerb = async (
    id: string,
    data: IrregularVerb,
    refresh?: boolean
  ) => {
    await db.irregularVerbs
      .where({ lang: currentLanguage.value, id })
      .modify(data);
    refresh && $emit('request-irregular-verbs');
  };

  return {
    getIrregularVerb,
    getIrregularVerbs,
    getAllIrregularVerbs,
    addNewIrregularVerb,
    removeIrregularVerb,
    editIrregularVerb,
    seedIrregularVerbs,
  };
};
