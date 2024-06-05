import { db } from 'src/db';
import { liveQuery } from 'dexie';
import { useLanguagesStore } from 'src/stores/languagesStore';
import { computed } from 'vue';
import { useErrors } from './useErrors';
// import { sentences } from 'src/data';
import { Sentence } from 'src/components/models';
import useAppEventBus from 'src/composables/useAppEventBus';
// import useUtils from 'src/composables/useUtils';

export const useSentences = () => {
  const { $emit } = useAppEventBus();
  const languagesStore = useLanguagesStore();
  // const { generateId } = useUtils();

  const currentLanguage = computed(() => {
    return languagesStore.currentLanguage;
  });
  const { alreadyExists } = useErrors();

  const getAllSentences = async () => {
    return db.sentences.where({ lang: currentLanguage.value }).sortBy('term');
  };

  const getSentences = (offset = 0, trainingValue?: boolean) => {
    const searchLower = languagesStore.searchValue?.toLowerCase();

    return liveQuery(() =>
      db.sentences
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

  const getSentence = async (query: object) => {
    return await db.sentences
      .where({ lang: currentLanguage.value, ...query })
      .first();
  };

  const addNewSentence = async (data: Sentence) => {
    if (await getSentence({ term: data.term })) {
      alreadyExists('phrasal verb', data.term);
    }
    await db.sentences.add({ ...data, lang: currentLanguage.value });
    $emit('request-phrasal-verbs');
  };

  const removeSentence = async (id: string) => {
    await db.sentences.where({ lang: currentLanguage.value, id }).delete();
  };

  const editSentence = async (
    id: string,
    data: Sentence,
    refresh?: boolean
  ) => {
    await db.sentences.where({ lang: currentLanguage.value, id }).modify(data);
    refresh && $emit('request-phrasal-verbs');
  };

  // const seedSentences = async () => {
  //   if (!(await getAllSentences()).length) {
  //     sentences.forEach(
  //       async (verb: {
  //         term: string;
  //         translation: string;
  //         explanation?: string;
  //       }) => {
  //         await addNewSentence({
  //           ...verb,
  //           lang: currentLanguage.value,
  //           id: generateId(),
  //           training: false,
  //           explanation: '',
  //         });
  //       }
  //     );
  //   }
  // };
  return {
    getSentence,
    getSentences,
    getAllSentences,
    addNewSentence,
    removeSentence,
    editSentence,
    // seedSentences,
  };
};
